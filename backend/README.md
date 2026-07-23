# PEHCHAAN Backend

This is the FastAPI backend foundation for PEHCHAAN. It provides the REST API for the frontend and manages data persistence via PostgreSQL.

## Architecture

- **FastAPI**: API framework
- **SQLAlchemy 2.x**: ORM for database operations
- **Alembic**: Database migrations
- **Pydantic**: Data validation and serialization
- **PostgreSQL**: Production database (compatible with Neon and other managed providers)

## Prerequisites

- Python 3.10+
- PostgreSQL database

## Setup Instructions

1. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Environment Configuration:**
   Copy `.env.example` to `.env` and fill in your PostgreSQL credentials.
   ```bash
   cp .env.example .env
   ```

4. **Database Migrations:**
   Run Alembic to create the database schema:
   ```bash
   alembic upgrade head
   ```

5. **Seed Demo Data:**
   Run the seed script to populate the database with the initial demo user and mock assessment data.
   ```bash
   python seed_data.py
   ```

6. **Run the Development Server:**
   ```bash
   uvicorn app.main:app --reload
   ```

## API Documentation

Once the server is running, interactive API documentation is available at:
- Swagger UI: [http://localhost:8000/api/v1/openapi.json](http://localhost:8000/docs) (Typically hosted at `/docs`)
- ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## Testing

Run tests using pytest:
```bash
pytest
```
