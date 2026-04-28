
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx  # For async HTTP requests to Ollama
import json   # For JSON parsing
import logging  # For application logging
import psycopg2  # PostgreSQL database adapter
from psycopg2.extras import RealDictCursor  # Returns query results as dictionaries

# Initialize FastAPI application with metadata
app = FastAPI(title="RDI AI Search Service")

# Configure CORS - allows frontend to communicate with this backend API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (adjust for production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],
)

# Setup logging to track application events and errors
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Ollama LLM service configuration - runs locally on port 11434
OLLAMA_BASE_URL = "http://127.0.0.1:11434"  # Base URL for Ollama API
MODEL_NAME = "llama3.1:8b"  # Lightweight 8-billion parameter model

# PostgreSQL database configuration
DB_CONFIG = {
    "host": "localhost",  # Database server
    "port": 5432,  # Default PostgreSQL port
    "database": "rdi_platform",  # Database name
    "user": "rdi_user",  # Database user
    "password": "rdi_password_secure",  # Password (use environment variables for production)
}

def get_db_connection():
    """
    Establishes a connection to PostgreSQL database using DB_CONFIG credentials.
    Returns connection object or None if connection fails. Errors are logged.
    """
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        return conn
    except psycopg2.Error as e:
        logger.error(f"Database connection error: {e}")
        return None

def search_positions_in_db(keywords, location=None, limit=20):
    """
    Searches database for positions matching keywords and optional location.
    
    Args:
        keywords (list): List of search terms (e.g., ["python", "backend"])
        location (str): Optional location filter (e.g., "Helsinki")
        limit (int): Maximum results to return (default: 20)
    
    Returns:
        list: Position dictionaries with id, title, description, company info
    
    Uses PostgreSQL full-text search (tsvector/tsquery) to match across
    position titles, descriptions, and company names. Joins positions and
    companies tables and orders by company name and position title.
    """
    conn = get_db_connection()
    if not conn:
        return []
    
    try:
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        # Combine keywords with OR operator for PostgreSQL full-text search
        # The pipe (|) means "or" in PostgreSQL full-text search
        search_terms = " | ".join(keywords)  # e.g., "python | backend | database"
        
        query = f"""
        SELECT DISTINCT
            p.id,
            p.title,
            p.description,
            c.id as company_id,
            c.name as company_name,
            c.location,
            c.email,
            c.website,
            c.about
        FROM positions p
        JOIN companies c ON p.company_id = c.id
        WHERE (
            to_tsvector('english', p.title) @@ to_tsquery('english', %s)
            OR to_tsvector('english', p.description) @@ to_tsquery('english', %s)
            OR to_tsvector('english', c.name) @@ to_tsquery('english', %s)
        )
        """
        # to_tsvector: converts text to searchable tokens (stemming, stop words removal)
        # to_tsquery: converts search terms to query format
        # @@: match operator (checks if tsquery matches tsvector)
        
        params = [search_terms, search_terms, search_terms]
        
        # Add location filter if provided (case-insensitive partial match)
        if location:
            query += " AND LOWER(c.location) LIKE %s"
            params.append(f"%{location.lower()}%")
        
        # Order results and apply limit
        query += " ORDER BY c.name, p.title LIMIT %s"
        params.append(limit)
        
        # Execute parameterized query (prevents SQL injection)
        cur.execute(query, params)
        results = cur.fetchall()
        cur.close()
        conn.close()
        
        # Convert database rows to plain dictionaries
        return [dict(row) for row in results]
    except Exception as e:
        logger.error(f"Database search error: {e}")
        return []

# Pydantic model for API request validation
# Defines the expected structure of incoming search requests
class SearchQuery(BaseModel):
    query: str  # User's natural language search query
    role: str = "student"  # User role: "student", "company", or "general" (default: "student")

# System prompts for different user roles
# Ollama uses these prompts to understand the user's intent and extract relevant keywords
SYSTEM_PROMPTS = {
    "student": """You are an intelligent search engine for internship positions in an RDI platform.

Your job is to:
1. Understand what kind of internship/Summer Trainee the student wants（internship = "internship" or "summer_trainee"）
2. Extract MAIN KEYWORDS for position titles and descriptions (e.g., "software", "web", "data", "IT")
3. Extract location preference if mentioned (e.g., "Helsinki", "Lahti", "Finland")
4. Generate understanding of their intent 

IMPORTANT:
- Focus on position titles and technical skills
- Keep keywords simple and searchable (single words, no phrases)
- If multiple keywords exist, list them separately
- Return ONLY valid JSON, no markdown or extra text

Output format:
{
  "keywords": ["keyword1", "keyword2"],
  "location": "city_or_null",
  "intent": "user's goal in one sentence",
  "explanation": "Why these keywords match their request"
}""",
    
    "company": """You are an intelligent search engine for talent in an RDI platform.

Your job is to:
1. Understand what skills/experience the company seeks
2. Extract MAIN KEYWORDS (e.g., "python", "data", "web", "devops")
3. Extract location preference if mentioned
4. Generate understanding of their talent needs

IMPORTANT:
- Focus on technical skills and roles
- Keep keywords simple and searchable
- Return ONLY valid JSON, no markdown

Output format:
{
  "keywords": ["skill1", "skill2"],
  "location": "city_or_null",
  "intent": "company's talent need in one sentence",
  "explanation": "Why these keywords match their request"
}""",
    
    "general": """You are an intelligent search engine for the RDI platform.

Extract key search terms and location from the query.

Output format:
{
  "keywords": ["keyword1", "keyword2"],
  "location": "city_or_null",
  "intent": "search intent",
  "explanation": "reasoning"
}"""
}

@app.get("/health")
async def health_check():
    """
    Health check endpoint to verify service status.
    Returns service information including Ollama URL and model name.
    """
    return {
        "status": "ok",
        "service": "RDI AI Search",
        "ollama_url": OLLAMA_BASE_URL,
        "model": MODEL_NAME
    }

@app.post("/ai-search")
async def ai_search(search_request: SearchQuery):
    """
    Main AI-powered search endpoint combining natural language understanding with database queries.
    
    Process:
    1. Gets system prompt based on user role (student/company/general)
    2. Sends user query to Ollama for NLU (natural language understanding)
    3. Ollama extracts keywords and location from the response
    4. Queries PostgreSQL database with extracted keywords
    5. Returns analysis insights and matching positions
    
    Request: { "query": "I need IT internship in Helsinki", "role": "student" }
    Response: { "success": true, "analysis": {...}, "positions": [...] }
    
    Error Handling:
    - Catches connection errors to Ollama service (503 Service Unavailable)
    - Handles JSON parsing failures with fallback keyword extraction
    - Returns descriptive error messages for debugging
    """
    
    try:
        # Select system prompt based on user role
        system_prompt = SYSTEM_PROMPTS.get(search_request.role, SYSTEM_PROMPTS["general"])
        
        # Construct prompt for Ollama
        prompt = f"""{system_prompt}

User query: "{search_request.query}"

Output (ONLY JSON, no markdown):"""
        
        logger.info(f"Processing query: {search_request.query} (role: {search_request.role})")
        
        # Call Ollama API for natural language understanding
        # Llama 3.1:8b will extract keywords and location from the user query
        async with httpx.AsyncClient(timeout=120.0) as client:
            response = await client.post(
                f"{OLLAMA_BASE_URL}/api/generate",
                json={
                    "model": MODEL_NAME,
                    "prompt": prompt,
                    "stream": False,  # Get complete response at once (not streaming)
                    "temperature": 0.3,  # Lower temperature = more deterministic/consistent responses
                }
            )
            
            if response.status_code != 200:
                logger.error(f"Ollama error: {response.text}")
                raise HTTPException(status_code=500, detail="Ollama service error")
            
            ollama_response = response.json()
            generated_text = ollama_response.get("response", "")
            logger.info(f"Ollama response: {generated_text[:300]}...")
        
        # Extract JSON from Ollama response
        # Ollama may include explanatory text, so we extract just the JSON part
        try:
            json_start = generated_text.find("{")
            json_end = generated_text.rfind("}") + 1
            
            if json_start == -1 or json_end == 0:
                raise ValueError("No JSON found")
            
            json_str = generated_text[json_start:json_end]
            ai_result = json.loads(json_str)
            
        except json.JSONDecodeError as e:
            # Fallback: if JSON parsing fails, extract keywords from original query
            logger.error(f"JSON parse error: {e}")
            ai_result = {
                "keywords": search_request.query.split()[:3],
                "location": None,
                "intent": "search",
                "explanation": "Fallback parsing"
            }
        
        # Extract keywords and location from AI analysis
        keywords = ai_result.get("keywords", [])
        location = ai_result.get("location")
        
        logger.info(f"Keywords: {keywords}, Location: {location}")
        
        # Search database for matching positions
        if keywords:
            positions = search_positions_in_db(keywords, location)
        else:
            positions = []
        
        logger.info(f"Found {len(positions)} matching positions")
        
        # Return comprehensive response with analysis and results
        return {
            "success": True,
            "query": search_request.query,
            "role": search_request.role,
            "analysis": {
                "expanded_keywords": keywords,
                "intent": ai_result.get("intent", ""),
                "explanation": ai_result.get("explanation", ""),
                "recommendation": f"Found {len(positions)} matching positions"
            },
            "positions": positions
        }
        
    except httpx.ConnectError:
        logger.error("Cannot connect to Ollama")
        raise HTTPException(
            status_code=503,
            detail="Ollama service not available"
        )
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@app.get("/")
async def root():
    """
    Root endpoint provides API information and available endpoints.
    Returns service name, version, and list of available API routes.
    """
    return {
        "message": "RDI AI Search Service",
        "version": "1.0",
        "endpoints": {
            "health": "/health",
            "ai_search": "/ai-search",
            "docs": "/docs"
        }
    }

if __name__ == "__main__":
    import uvicorn
    # Start FastAPI server on localhost:8000 with auto-reload enabled
    uvicorn.run(app, host="127.0.0.1", port=8000)
