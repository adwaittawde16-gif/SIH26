"""
api_server.py
------------
Production REST API Server entrypoint exposing app_backend FastAPI application.
Supports dynamic PORT assignment for Railway, Render, Docker, and local execution.

Part of: CDR & CCTV Intelligence & Threat Analysis System
For: Brihanmumbai Police Department — SIH 26
"""

import os
import sys
import uvicorn
from app_backend.main import app

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def run_server():
    port = int(os.environ.get("PORT", 8080))
    host = os.environ.get("HOST", "0.0.0.0")
    print(f"[*] Initializing Brihanmumbai Police Intelligence API (FastAPI v2.0)...")
    print(f"[OK] Server starting on http://{host}:{port}")
    print(f"     OpenAPI Interactive Docs available at: http://{host}:{port}/docs")
    uvicorn.run(app, host=host, port=port)

if __name__ == '__main__':
    run_server()
