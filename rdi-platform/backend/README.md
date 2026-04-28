# RDI AI Search Platform - Backend

## Project Description

The RDI AI Search Backend is a FastAPI application that provides intelligent search functionality for internship positions. It combines natural language understanding with full-text search to help students find the perfect internship positions.

The backend was created to solve the problem of matching student queries to relevant internship opportunities. By using artificial intelligence and database search, it understands what students are looking for and returns the most relevant positions.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Requirements](#requirements)
5. [Installation and Setup](#installation-and-setup)
6. [Quick Start](#quick-start)
7. [API Documentation](#api-documentation)
8. [Project Structure](#project-structure)
9. [Configuration](#configuration)
10. [Troubleshooting](#troubleshooting)
11. [Contributing](#contributing)
12. [Credits](#credits)
13. [License](#license)

## Overview

The RDI AI Search Backend is a FastAPI application that provides intelligent search functionality for internship positions. It uses Ollama with Llama 3.1:8b for natural language understanding, PostgreSQL for efficient full-text search and data storage, and FastAPI for high-performance REST API endpoints.

### How It Works

```
User Query
    ↓
FastAPI Backend
    ↓
Ollama LLM (Keyword & Location Extraction)
    ↓
PostgreSQL Full-Text Search
    ↓
Ranked Results
    ↓
React Frontend
```

## Features

AI-Powered Search using Llama 3.1:8b to understand natural language queries. Full-Text Search with PostgreSQL native full-text search for fast, accurate results. Location Filtering that automatically extracts and filters by location preference. Multi-Role Support with optimized queries for students, companies, and general users. Semantic Understanding that understands context differences between words. Fast Inference with a lightweight 8B parameter model for quick responses. CORS Enabled and ready for frontend integration. Full API Docs with interactive Swagger UI at /docs.

## Tech Stack

We use FastAPI 0.100+ for the REST API, Python 3.11+ for the code, PostgreSQL 15 for the database, Ollama with Llama 3.1:8b for the LLM, httpx for async HTTP requests to Ollama, psycopg2 for connecting to PostgreSQL, Uvicorn as the server, and Docker for running the database in a container.

## Requirements

You need at least 8GB of RAM, preferably 16GB if you want to run the LLM. Make sure you have 10GB+ of free disk space for Ollama and the model. Python 3.11+, Docker, Docker Compose, Ollama, and Git are all required.

## Installation and Setup

First, install Ollama from ollama.ai or ollama.com. Run the installer, then in PowerShell run ollama serve to start the server. In another window, run ollama pull llama3.1:8b to download the model. Make sure the server is running on 127.0.0.1:11434.

Next, set up the database. Go to the backend folder and run docker-compose up -d to start PostgreSQL in Docker. Then run python verify_db.py to make sure everything connected properly.

Finally, set up Python. Create a virtual environment with python -m venv venv, activate it with .\venv\Scripts\Activate.ps1 on Windows or source venv/bin/activate on Mac/Linux. Then run pip install -r requirements.txt to install all the packages.

## Quick Start

Make sure Ollama is running, PostgreSQL is running, your Python venv is activated, and you've installed the requirements. Then just run python ai_service.py and the server will start on 127.0.0.1:8000. You can test it with curl or open http://127.0.0.1:8000/docs to see the interactive API docs.

## API Documentation

The API is at http://127.0.0.1:8000. There are three main endpoints:

The /health endpoint tells you if the service is running.

The /ai-search endpoint takes a query and role and returns matching internship positions. Query is required, role defaults to student. The role can be student, company, or general.

The / endpoint just gives you info about the service.

Check http://127.0.0.1:8000/docs for the interactive Swagger docs where you can test everything.

## Project Structure

The backend folder has ai_service.py which is the main app, requirements.txt for dependencies, docker-compose.yml to set up the database, init.sql with the database schema, verify_db.py to test the connection, company_data.json with sample data, and some JavaScript files for updating data.

## Configuration

You can create a .env file in the backend directory to customize settings. Put things like OLLAMA_BASE_URL, MODEL_NAME, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, API_HOST, and API_PORT in there. Or just edit ai_service.py directly to change settings like the Ollama URL, model name, and database connection details.

## Troubleshooting

Can't connect to Ollama? Make sure ollama serve is running in another terminal. Check that the server is listening on 127.0.0.1:11434. Run ollama list to verify the model is installed.

Database connection error? Check that Docker is running and the PostgreSQL container is up. Run docker-compose down then docker-compose up -d to restart it. Test the connection with python verify_db.py.

Port 5432 already in use? Find the process using it with netstat -ano | findstr :5432 and kill it with taskkill /PID <PID> /F. Or change the port in docker-compose.yml.

Module not found? Activate your virtual environment with .\venv\Scripts\Activate.ps1 on Windows or source venv/bin/activate on Mac/Linux. Then run pip install -r requirements.txt again.

Python version wrong? Make sure you're using Python 3.11+. Check with python --version.

## Useful Commands

For Ollama: ollama serve starts the server, ollama list shows installed models, ollama pull llama3.1:8b downloads a model, ollama rm llama3.1:8b removes a model, ollama run llama3.1:8b "your question" lets you test the model directly.

For Docker: docker-compose up -d starts the database, docker-compose ps shows running containers, docker-compose logs -f postgres shows logs, docker-compose down stops everything, docker-compose down -v removes all data too.

For Python: .\venv\Scripts\Activate.ps1 on Windows or source venv/bin/activate on Mac/Linux activates the virtual environment. pip install -r requirements.txt installs packages. python ai_service.py runs the backend. pip list shows installed packages. pip freeze > requirements.txt creates a new requirements file.

## Contributing

Want to help? Fork the repo, create a feature branch, make your changes, and send a pull request. Follow PEP 8 style guide, add docstrings to functions, test all API endpoints, and update the documentation. Make sure everything works before submitting.

## Credits

This project is part of the RDI AI Search Platform, an intelligent internship search solution combining artificial intelligence with modern backend technologies. Key technologies and their creators include the FastAPI team for the modern web framework, PostgreSQL team for the reliable database, Ollama team for the LLM runtime, and the Python open source community. Special thanks to project lead Lin Tong and the development team and contributors.

## License

This project is licensed under the MIT License. See the LICENSE file in the project root for details. This means you are free to use, modify, and distribute the software as long as you include the original license in your distribution.

## Related Documentation

Database Setup: DATABASE_SETUP.md
API Reference: API_DOCS.md
Frontend Documentation: ../frontend/README.md
Full Implementation Guide: ../IMPLEMENTATION_PRESENTATION.html


