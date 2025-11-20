# SolfaMe - AI Music Transcription Platform

## Project Structure

This is a monorepo containing the complete SolfaMe application for AI-powered music transcription and choir education.

### Architecture

- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Backend**: Python FastAPI for audio processing
- **Shared**: TypeScript types and utilities
- **Database**: PostgreSQL with Prisma ORM (Story 1.2)
- **Queue**: Redis with Bull Queue (Story 1.5)
- **Storage**: AWS S3 for temporary files (Story 1.6)

### Workspace Structure

```
solfame-backend/
├── apps/
│   ├── web/                 # Next.js frontend application
│   └── audio-service/       # Python FastAPI audio processing service
├── packages/
│   └── shared/             # Shared TypeScript types and utilities
├── docs/                   # Project documentation and planning
└── .bmad/                  # BMAD workflow configuration
```

## Development Setup

### Prerequisites

- Node.js 18+ and npm 9+
- Python 3.11+
- PostgreSQL (for Story 1.2)
- Redis (for Story 1.5)

### Installation

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Install Python dependencies**:
   ```bash
   cd apps/audio-service
   pip install -r requirements.txt
   ```

### Running the Application

**Development mode (both services)**:

```bash
npm run dev
```

This starts:

- Next.js web app on http://localhost:3000
- FastAPI audio service on http://localhost:8000

**Individual services**:

```bash
# Frontend only
npm run dev:web

# Audio service only
npm run dev:audio
```

### Available Scripts

- `npm run dev` - Start both services in development mode
- `npm run build` - Build all applications for production
- `npm run lint` - Run ESLint across all workspaces
- `npm run format` - Format code with Prettier
- `npm run typecheck` - Run TypeScript type checking

## Project Status

**Current Story**: 1-1 Project Structure & Monorepo Setup ✅ **COMPLETED**

**Next Steps**:

- Story 1-2: Database Schema & Prisma Setup
- Story 1-3: Enhanced Next.js Web App with API Routes
- Story 1-4: Enhanced Python FastAPI Audio Service

## API Endpoints

### Web App (Port 3000)

- `GET /api/health` - Health check
- More endpoints coming in Story 1-3

### Audio Service (Port 8000)

- `GET /` - Health check
- `POST /process-audio` - Audio processing (placeholder)
- `GET /health` - Detailed health information

## Contributing

This project follows the BMAD workflow system. See `docs/` for user stories and technical specifications.

## License

MIT License - See LICENSE file for details.
