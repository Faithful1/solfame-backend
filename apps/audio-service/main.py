from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any
import os
from datetime import datetime

app = FastAPI(
    title="SolfaMe Audio Service",
    description="AI-powered audio processing service for music transcription",
    version="1.0.0"
)

# CORS configuration for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Next.js dev server
        "https://solfame.app",    # Production domain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class HealthResponse(BaseModel):
    status: str
    service: str
    version: str
    timestamp: str

class AudioProcessRequest(BaseModel):
    youtube_url: str
    options: Dict[str, Any] = {}

@app.get("/", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    return HealthResponse(
        status="ok",
        service="SolfaMe Audio Service",
        version="1.0.0",
        timestamp=datetime.now().isoformat()
    )

@app.post("/process-audio")
async def process_audio(request: AudioProcessRequest):
    """Process audio from YouTube URL - placeholder implementation"""
    return {
        "message": "Audio processing not implemented yet",
        "youtube_url": request.youtube_url,
        "status": "pending"
    }

@app.get("/health")
async def detailed_health():
    """Detailed health check with system information"""
    return {
        "status": "healthy",
        "service": "SolfaMe Audio Service",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat(),
        "environment": os.getenv("ENVIRONMENT", "development"),
        "python_version": "3.11+",
        "dependencies": {
            "fastapi": "0.104.1",
            "librosa": "0.10.1",
            "yt-dlp": "2023.11.16"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)