const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection pool
const pool = new Pool({
  user: process.env.POSTGRES_USER || "rdi_user",
  password: process.env.POSTGRES_PASSWORD || "rdi_password_secure",
  host: process.env.POSTGRES_HOST || "localhost",
  port: process.env.POSTGRES_PORT || 5432,
  database: process.env.POSTGRES_DB || "rdi_platform",
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});

// Routes

// Get all companies
app.get("/api/companies", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        c.id, 
        c.name, 
        c.about, 
        c.culture, 
        c.website, 
        c.email, 
        c.location,
        COUNT(p.id) as position_count
      FROM companies c
      LEFT JOIN positions p ON c.id = p.company_id
      GROUP BY c.id
      ORDER BY c.name`,
    );

    const companies = result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      about: row.about,
      culture: row.culture,
      website: row.website,
      email: row.email,
      location: row.location,
      positionCount: parseInt(row.position_count),
      type: "company",
    }));

    res.json(companies);
  } catch (err) {
    console.error("Error fetching companies:", err);
    res.status(500).json({ error: "Failed to fetch companies" });
  }
});

// Get single company with positions
app.get("/api/companies/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Get company details
    const companyResult = await pool.query(
      "SELECT * FROM companies WHERE id = $1",
      [id],
    );

    if (companyResult.rows.length === 0) {
      return res.status(404).json({ error: "Company not found" });
    }

    const company = companyResult.rows[0];

    // Get positions for this company
    const positionsResult = await pool.query(
      "SELECT * FROM positions WHERE company_id = $1 ORDER BY title",
      [id],
    );

    const positions = positionsResult.rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
    }));

    res.json({
      id: company.id,
      name: company.name,
      about: company.about,
      culture: company.culture,
      website: company.website,
      email: company.email,
      location: company.location,
      positions: positions,
      type: "company",
    });
  } catch (err) {
    console.error("Error fetching company:", err);
    res.status(500).json({ error: "Failed to fetch company" });
  }
});

// Get positions for a company
app.get("/api/companies/:id/positions", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT p.id, p.title, p.description 
       FROM positions p 
       WHERE p.company_id = $1 
       ORDER BY p.title`,
      [id],
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching positions:", err);
    res.status(500).json({ error: "Failed to fetch positions" });
  }
});

// Search companies and positions
app.get("/api/search", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ error: "Query parameter 'q' is required" });
    }

    const searchTerm = `%${q.toLowerCase()}%`;

    const result = await pool.query(
      `SELECT DISTINCT
        c.id,
        c.name,
        c.location,
        c.email,
        COUNT(DISTINCT p.id) as position_count
      FROM companies c
      LEFT JOIN positions p ON c.id = p.company_id
      WHERE 
        LOWER(c.name) LIKE $1 OR
        LOWER(c.about) LIKE $1 OR
        LOWER(p.title) LIKE $1 OR
        LOWER(p.description) LIKE $1
      GROUP BY c.id
      ORDER BY c.name`,
      [searchTerm],
    );

    const companies = result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      location: row.location,
      email: row.email,
      positionCount: parseInt(row.position_count),
      type: "company",
    }));

    res.json(companies);
  } catch (err) {
    console.error("Error searching:", err);
    res.status(500).json({ error: "Failed to search" });
  }
});

// AI-powered search (forwards to FastAPI)
app.post("/api/ai-search", async (req, res) => {
  try {
    const { query, role = "student" } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    console.log(`[AI Search] Query: "${query}", Role: ${role}`);

    // Forward to FastAPI service
    const fastApiUrl = "http://127.0.0.1:8000/ai-search";
    const response = await fetch(fastApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, role }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("FastAPI error:", error);
      return res.status(response.status).json(error);
    }

    const aiResult = await response.json();
    console.log("[AI Search] Success:", aiResult.result);

    res.json(aiResult);
  } catch (error) {
    console.error("[AI Search] Error:", error.message);

    // Check if it's a connection error (Ollama not running)
    if (
      error.message.includes("fetch failed") ||
      error.message.includes("ECONNREFUSED")
    ) {
      return res.status(503).json({
        error: "AI service unavailable",
        message: "Please start Ollama and FastAPI service",
        details: error.message,
      });
    }

    res.status(500).json({
      error: "AI search failed",
      message: error.message,
    });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    services: {
      express: "running",
      database: "check connection",
      fastapi: "check port 8000",
      ollama: "check port 11434",
    },
  });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
  console.log(`AI Search available at http://localhost:${PORT}/api/ai-search`);
});
