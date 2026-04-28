# RDI Platform Backend API

This is the FastAPI backend server for RDI Platform that connects to a PostgreSQL database. The server runs on localhost:8000 and provides a few main API endpoints for searching internship positions using AI.

## Quick Start

First you need to install all the Python dependencies. They're listed in requirements.txt, so just run pip install from inside a virtual environment.

Then start the PostgreSQL database. We use Docker to run it, so just go into the backend directory and run docker-compose up -d to get it going.

Finally start the FastAPI server. In your virtual environment run python ai_service.py and the server will start running on localhost:8000.

## Main API Endpoints

### Health Check

GET /health

This endpoint just checks if the server is still alive. It returns a simple OK message.

### AI Search

POST /ai-search

This is the main endpoint for the whole project. You send a JSON request with a search_query and an optional location. The system uses Ollama's LLM model to understand what you're looking for, then searches the database for matching internship positions.

The request format looks like this:

{
"search_query": "I want to find a Python internship",
"location": "Finland"
}

The results come back with all matching positions, each one showing the company name, job title, description, location and other details.

## Environment Configuration

The server reads some config values from the .env.db file in the backend directory:

POSTGRES_USER=rdi_user
POSTGRES_PASSWORD=rdi_password_secure
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=rdi_platform

## Database Connection

The backend connects to PostgreSQL running in Docker. You need to make sure the Docker container is running, so run docker-compose up -d.

The SQL script in init.sql handles setting up all the tables and loading the sample data. Docker compose runs this automatically when the container starts.

## Response Example

When you search using the AI search endpoint, the response looks something like this:

{
"query": "Python developer",
"results": [
{
"company": "Kempower",
"position": "Software Engineer",
"description": "Looking for Python backend developer...",
"location": "Finland"
}
]
}

## Frontend Integration

The React frontend is set up to call this backend API. During development the frontend runs on localhost:5173 and the backend runs on localhost:8000.

CORS is already configured so the frontend can make requests directly to the backend without issues.

## Troubleshooting

If you see database connection errors, check that the Docker container is still running. Run docker-compose ps to see the status.

If you get CORS errors, it's probably because the frontend and backend URLs don't match or CORS isn't configured right. Make sure both are running and on the correct ports.

If an API endpoint returns a 500 error, check the terminal output for error messages. Usually it means either the Ollama LLM model isn't available or there's a problem with the database query.

API docs updated April 28, 2026
