# SolfaMe Backend - Architecture Document

**Author:** FAIYATech  
**Date:** 2025-11-20  
**Version:** 1.0

---

## Project Context Understanding

I'm reviewing your project documentation for **SolfaMe**.

I found comprehensive functional requirements organized into 5 main epics:

- **Epic 1**: YouTube Song Input & Processing
- **Epic 2**: AI Source Separation & Transcription
- **Epic 3**: Multi-Modal Correction Interface
- **Epic 4**: Quality Assurance & Review
- **Epic 5**: PDF Generation & Export

Key aspects I notice:

- **Core functionality**: AI-powered music transcription with multi-modal correction interface
- **Critical NFRs**: 90% accuracy target, <2 minute processing time, 95% success rate
- **Unique challenges**: Real-time audio processing, humming corrections, music theory validation
- **Solo development friendly**: Architecture must be manageable for single developer
- **Quality-first philosophy**: Precision over speed, designed for church worship contexts

This will help me guide you through the architectural decisions needed to ensure AI agents implement this consistently.

## Repository Architecture Decision

**Monorepo with Service Separation**

**Simplified Repository Structure:**

```
solfame/                   # Main monorepo
├── apps/
│   ├── web/              # Next.js app (frontend + API routes)
│   └── audio-service/    # Python audio processing service
├── packages/
│   └── shared/          # Shared types and utilities
├── docs/               # Documentation
├── scripts/           # Build and deployment scripts
└── package.json       # Root workspace configuration
```

**Workspace Configuration (package.json):**

```json
{
  "name": "solfame",
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev": "concurrently \"npm run dev:web\" \"npm run dev:audio\"",
    "dev:web": "cd apps/web && npm run dev",
    "dev:audio": "cd apps/audio-service && uvicorn main:app --reload"
  }
}
```

**Web App (apps/web/):**
**Foundation:** Next.js + TypeScript (Frontend + API)

```bash
cd apps && npx create-next-app@latest web --typescript --tailwind --app
```

**Audio Service (apps/audio-service/):**
**Foundation:** FastAPI + Python

```bash
cd apps && mkdir audio-service && cd audio-service
pip install fastapi uvicorn librosa yt-dlp
```

**Shared Package (packages/shared/):**
**Foundation:** TypeScript Library

```bash
cd packages && mkdir shared && cd shared
npm init -y && npm install typescript
```

**Simplified Complete Structure:**

```
solfame/
├── apps/
│   ├── web/                     # Next.js (frontend + API)
│   │   ├── src/
│   │   │   ├── app/            # Next.js 13+ app directory
│   │   │   │   ├── api/        # API routes (replaces NestJS)
│   │   │   │   ├── transcribe/ # Transcription pages
│   │   │   │   └── globals.css
│   │   │   ├── components/     # React UI components
│   │   │   │   ├── audio/      # Audio player, waveform viewer
│   │   │   │   ├── correction/ # Correction interface
│   │   │   │   └── pdf/        # PDF preview components
│   │   │   ├── hooks/          # Custom React hooks
│   │   │   ├── lib/            # Utilities, database, services
│   │   │   └── types/          # Frontend types
│   │   ├── prisma/             # Database schema
│   │   ├── public/             # Static assets
│   │   └── package.json
│   └── audio-service/          # Python audio processing
│       ├── src/
│       │   ├── routes/         # FastAPI routes
│       │   ├── services/       # Audio processing logic
│       │   └── models/         # Data models
│       ├── requirements.txt
│       └── main.py
└── packages/
    └── shared/                 # Shared utilities
        ├── src/
        │   ├── types/          # API contracts
        │   ├── constants/      # Shared constants
        │   └── utils/          # Cross-platform utilities
        └── package.json
```

**Simplified Architecture Benefits:**

- **Single Node.js Codebase:** Frontend + API in one Next.js app
- **Faster Development:** No API coordination overhead between separate services
- **Easy Deployment:** Single Next.js deployment + Python audio service
- **Clear Separation:** UI logic in React components, business logic in API routes
- **Growth Path:** Can extract NestJS API later when complexity demands it

## Critical Architecture Decisions

Based on your PRD requirements, we need to make several key decisions beyond what our starters provide:

**CRITICAL (blocks implementation):**

- AI Service Selection for source separation
- Audio processing pipeline architecture
- Real-time communication strategy
- File storage for temporary audio files
- Database schema design

**IMPORTANT (shapes user experience):**

- Music notation rendering library
- PDF generation approach
- Audio visualization solution
- Microphone input handling
- Deployment platform

Let's work through these decisions to ensure AI agents implement SolfaMe consistently.

## Decision Records

### 1. AI Source Separation Service

**Decision:** Replicate Demucs Model
**Version:** facebookresearch/demucs:83fc094485b9e693b1f2235b91b41b65f990e421dd7c7f453bb13f28df2ea8e5
**Rationale:** Good quality (85-90% accuracy) at reasonable cost for MVP validation, easy upgrade path to LALAL.AI later
**Affects Epic:** Epic 2 (AI Source Separation & Transcription)

**Implementation:**

```python
# apps/audio-service/src/services/separation_service.py
import replicate

async def separate_audio(audio_file_path: str):
    output = replicate.run(
        "facebookresearch/demucs:83fc094485b9e693b1f2235b91b41b65f990e421dd7c7f453bb13f28df2ea8e5",
        input={"audio": open(audio_file_path, "rb")}
    )
    return output  # Returns separated stems
```

**Integration Flow:**

1. YouTube URL → yt-dlp extraction → temp audio file
2. Audio file → Replicate Demucs → separated stems
3. Stems → pitch detection → SATB transcription

### 2. Real-Time Communication

**Decision:** Server-Sent Events (SSE)
**Rationale:** Perfect for streaming progress updates during 30-90 second processing, simple Next.js implementation
**Affects Epic:** All epics (user feedback during processing)

**Implementation:**

```typescript
// apps/web/src/app/api/transcribe/stream/route.ts
export async function GET() {
  const encoder = new TextEncoder();

  return new Response(
    new ReadableStream({
      start(controller) {
        // Stream progress: "Processing...", "Separating...", "Transcribing..."
        controller.enqueue(encoder.encode('data: Processing started\n\n'));
      },
    }),
    {
      headers: { 'Content-Type': 'text/event-stream' },
    }
  );
}
```

### 3. File Storage Strategy

**Decision:** Local filesystem with cleanup (MVP) → Cloud storage (production)
**Rationale:** Simple development with clear upgrade path, automatic cleanup prevents disk bloat
**Affects Epic:** All epics (temporary file management)

**Implementation:**

```typescript
// File structure in /tmp/solfame/
/tmp/solfame/
├── sessions/
│   └── {session-id}/
│       ├── original.mp3     # YouTube download
│       ├── vocals-only.wav  # After AI separation
│       ├── stems/           # SATB separated parts
│       │   ├── soprano.wav
│       │   ├── alto.wav
│       │   ├── tenor.wav
│       │   └── bass.wav
│       └── output.pdf       # Final generated PDF
```

**Cleanup Policy:** Auto-delete session files after 24 hours
**Upgrade Path:** Migrate to AWS S3/Google Cloud Storage for production scaling

### 4. Music Notation Library

**Decision:** VexFlow
**Version:** 4.0.3 (latest stable)
**Rationale:** Professional rendering quality, editing capabilities for correction interface, solfa notation support
**Affects Epic:** Epic 3 (Multi-Modal Correction Interface), Epic 5 (PDF Generation)

**Implementation:**

```typescript
// apps/web/src/components/notation/NotationEditor.tsx
import { Renderer, Stave, StaveNote, Voice, Formatter } from 'vexflow';

// Render notation with solfa syllables
const renderNotationWithSolfa = (notes: NoteData[]) => {
  notes.forEach(note => {
    // Render note
    const staveNote = new StaveNote(note);
    // Add solfa syllable below note
    staveNote.addAnnotation(new Annotation(note.solfa));
  });
};
```

**Features Used:**

- Interactive note editing (click/drag corrections)
- Solfa text rendering under notes
- Real-time notation updates
- Export to professional PDF format

### 5. PDF Generation Approach

**Decision:** Client-side PDF generation with jsPDF + VexFlow
**Version:** jsPDF 2.5.1, VexFlow 4.0.3 integration
**Rationale:** Direct VexFlow export, immediate user preview, no server PDF processing load
**Affects Epic:** Epic 5 (PDF Generation & Export)

**Implementation:**

```typescript
// apps/web/src/lib/pdf-generator.ts
import jsPDF from 'jspdf';
import 'jspdf-svg';

const exportToPDF = (notation: VexFlowNotation) => {
  const pdf = new jsPDF('portrait', 'mm', 'a4');

  // Export VexFlow SVG directly to PDF
  const svgElement = notation.getSVG();
  pdf.svg(svgElement, {
    width: 210,
    height: 297,
    x: 10,
    y: 10,
  });

  pdf.save(`solfame-${songTitle}.pdf`);
};
```

**Output Features:**

- A4 format matching sample documents
- Individual SATB parts + combined score
- Solfa syllables under notation
- Professional typography and spacing

### 6. Audio Visualization Library

**Decision:** WaveSurfer.js
**Version:** 7.7.3 (latest stable)
**Rationale:** Professional waveform visualization, built-in correction features, perfect for multi-modal interface
**Affects Epic:** Epic 3 (Multi-Modal Correction Interface)

**Implementation:**

```typescript
// apps/web/src/components/audio/WaveformEditor.tsx
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions';

const createWaveform = (container: HTMLElement, audioUrl: string) => {
  return WaveSurfer.create({
    container,
    waveColor: '#4F46E5',
    progressColor: '#7C3AED',
    plugins: [
      RegionsPlugin.create({
        // Enable section-based corrections
        dragSelection: true,
      }),
    ],
  });
};
```

**Features Used:**

- Multi-track waveform display (original + SATB parts)
- Timeline scrubbing synchronized with VexFlow notation
- Region selection for section-based corrections
- A/B comparison playback (original vs generated)

### 7. Database Schema Design

**Decision:** SQLite (development) → PostgreSQL (production) with Prisma ORM
**Version:** Prisma 5.7.1, SQLite 3.x / PostgreSQL 15+
**Rationale:** Simple development setup with clear production upgrade path, JSON support for complex notation data
**Affects Epic:** All epics (data persistence and session management)

**Core Schema:**

```prisma
// apps/web/prisma/schema.prisma
model TranscriptionSession {
  id          String   @id @default(cuid())
  youtubeUrl  String
  songTitle   String?
  status      SessionStatus  @default(PROCESSING)
  progress    Int           @default(0)

  // Audio processing results
  originalAudio    String?   // File path
  separatedStems   Json?     // SATB file paths object

  // Transcription data
  notation         Json?     // VexFlow notation data
  confidenceScores Json?     // AI confidence per measure
  solfa            Json?     // Solfa syllables mapping

  // User corrections
  corrections      Correction[]

  // Output
  generatedPdf     String?   // PDF file path

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Correction {
  id        String @id @default(cuid())
  sessionId String
  measure   Int             // Measure number
  voice     Voice           // SOPRANO, ALTO, TENOR, BASS
  type      CorrectionType  // HUMMING, VISUAL, MANUAL
  oldData   Json           // Original notation data
  newData   Json           // Corrected notation data

  session   TranscriptionSession @relation(fields: [sessionId], references: [id])
  createdAt DateTime @default(now())
}

enum SessionStatus {
  PROCESSING
  READY_FOR_CORRECTION
  COMPLETED
  FAILED
}

enum Voice {
  SOPRANO
  ALTO
  TENOR
  BASS
}

enum CorrectionType {
  HUMMING
  VISUAL
  MANUAL
}
```

## Technology Stack Summary

| Component               | Technology          | Version   | Rationale                           |
| ----------------------- | ------------------- | --------- | ----------------------------------- |
| **Frontend Framework**  | Next.js             | 14.x      | Full-stack React with API routes    |
| **Language**            | TypeScript          | 5.x       | Type safety for solo development    |
| **Styling**             | Tailwind CSS        | 3.x       | Utility-first, rapid development    |
| **Database**            | SQLite → PostgreSQL | 3.x → 15+ | Simple dev setup → production scale |
| **ORM**                 | Prisma              | 5.7.1     | Type-safe database operations       |
| **Music Notation**      | VexFlow             | 4.0.3     | Professional notation rendering     |
| **Audio Visualization** | WaveSurfer.js       | 7.7.3     | Waveform display and editing        |
| **PDF Generation**      | jsPDF + VexFlow     | 2.5.1     | Client-side PDF export              |
| **AI Separation**       | Replicate Demucs    | Latest    | Cost-effective source separation    |
| **Audio Processing**    | Python FastAPI      | 0.104+    | yt-dlp, librosa, audio analysis     |
| **Real-time Updates**   | Server-Sent Events  | Native    | Progress streaming                  |
| **File Storage**        | Local FS → Cloud    | /tmp → S3 | Development → production            |

## System Architecture Flow

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Next.js Web   │    │  Python Audio    │    │  AI Services    │
│      App        │    │    Service       │    │  (Replicate)    │
├─────────────────┤    ├──────────────────┤    ├─────────────────┤
│ • React UI      │    │ • yt-dlp extract │    │ • Demucs model  │
│ • API Routes    │◄──►│ • Audio analysis │◄──►│ • Source sep    │
│ • VexFlow       │    │ • SATB separation│    │ • Stem output   │
│ • WaveSurfer    │    │ • FastAPI routes │    │                 │
│ • Prisma DB     │    │ • File management│    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
        │                        │
        ▼                        ▼
┌─────────────────┐    ┌──────────────────┐
│   Database      │    │  File Storage    │
│   (SQLite)      │    │   (/tmp/solfame) │
├─────────────────┤    ├──────────────────┤
│ • Sessions      │    │ • Audio files    │
│ • Corrections   │    │ • Temp stems     │
│ • Metadata      │    │ • Generated PDFs │
└─────────────────┘    └──────────────────┘
```

## Epic to Architecture Mapping

| Epic                             | Architecture Components           | Key Technologies                |
| -------------------------------- | --------------------------------- | ------------------------------- |
| **Epic 1: YouTube Input**        | Audio Service → yt-dlp extraction | Python FastAPI, yt-dlp          |
| **Epic 2: AI Separation**        | Audio Service → Replicate API     | Demucs model, librosa           |
| **Epic 3: Correction Interface** | Next.js → VexFlow + WaveSurfer    | React components, Web Audio API |
| **Epic 4: Quality Assurance**    | Database → confidence tracking    | Prisma schema, JSON fields      |
| **Epic 5: PDF Generation**       | Client-side → jsPDF export        | VexFlow SVG, A4 formatting      |

## Implementation Patterns

### Naming Conventions

- **Files**: kebab-case (`audio-processor.ts`)
- **Components**: PascalCase (`NotationEditor.tsx`)
- **Variables**: camelCase (`transcriptionSession`)
- **Database**: snake_case fields, PascalCase models
- **API Routes**: RESTful (`/api/transcribe/[id]/corrections`)

### Error Handling Pattern

```typescript
// Consistent error handling across all services
try {
  const result = await processAudio(url);
  return { success: true, data: result };
} catch (error) {
  logger.error('Audio processing failed', { url, error });
  return { success: false, error: error.message };
}
```

### File Organization Pattern

```typescript
// apps/web/src/
// ├── app/              # Next.js app router
// ├── components/       # Reusable UI components
// ├── lib/             # Business logic and utilities
// ├── hooks/           # Custom React hooks
// └── types/           # TypeScript type definitions
```

## Security Architecture

### Data Protection

- **No permanent audio storage**: Auto-cleanup after 24 hours
- **Session-based processing**: Isolated user sessions
- **Input validation**: YouTube URL sanitization
- **Rate limiting**: Prevent API abuse

### API Security

```typescript
// Rate limiting and validation
export async function POST(request: Request) {
  // Validate YouTube URL format
  const url = validateYouTubeUrl(await request.json());

  // Rate limit per IP
  await rateLimit(request);

  // Process with error boundaries
  return processTranscription(url);
}
```

## Performance Considerations

### Audio Processing Optimization

- **Streaming approach**: Process audio in chunks
- **Parallel processing**: SATB separation in parallel
- **Caching strategy**: Cache separated stems temporarily
- **Progress tracking**: Real-time SSE updates

### Frontend Performance

- **Component lazy loading**: Load correction interface on demand
- **Audio file optimization**: Compress temporary files
- **VexFlow optimization**: Render only visible notation
- **PDF generation**: Client-side to reduce server load

## Deployment Architecture

### Development Environment

```bash
# Single command startup
npm run dev
# Starts: Next.js (3000) + Python service (8000)
```

### Production Deployment Strategy

- **Web App**: Vercel/Netlify (Next.js)
- **Audio Service**: Railway/Render (Python)
- **Database**: PlanetScale/Supabase (PostgreSQL)
- **File Storage**: AWS S3/Cloudflare R2
- **Monitoring**: Vercel Analytics + Sentry

## Development Environment Setup

### Prerequisites

```bash
# Required tools
node >= 18.0.0
python >= 3.9
git
```

### Project Initialization

```bash
# 1. Initialize monorepo structure
mkdir solfame && cd solfame
npm init -y

# 2. Create Next.js web app
cd apps
npx create-next-app@latest web --typescript --tailwind --app
cd web && npm install prisma @prisma/client vexflow wavesurfer.js jspdf

# 3. Create Python audio service
cd ../
mkdir audio-service && cd audio-service
pip install fastapi uvicorn librosa yt-dlp replicate

# 4. Initialize shared package
cd ../packages
mkdir shared && cd shared && npm init -y
npm install typescript
```

## Architecture Decision Records (ADRs)

### ADR-001: Multi-service vs Monolithic

**Status**: Accepted  
**Decision**: Two-service architecture (Next.js + Python)
**Rationale**: Separates concerns while maintaining simplicity. Node.js for web/business logic, Python for audio processing expertise.

### ADR-002: Client-side vs Server-side PDF Generation

**Status**: Accepted
**Decision**: Client-side PDF generation with jsPDF + VexFlow
**Rationale**: Direct VexFlow integration, immediate user feedback, reduces server load.

### ADR-003: Real-time Communication Strategy

**Status**: Accepted
**Decision**: Server-Sent Events (SSE) for progress updates
**Rationale**: Simple implementation, perfect for one-way progress streaming, built into browsers.

### ADR-004: AI Service Selection

**Status**: Accepted  
**Decision**: Replicate Demucs with upgrade path to LALAL.AI
**Rationale**: Good quality/cost balance for MVP, easy to upgrade when revenue justifies higher costs.

---

## Next Steps

### Immediate Implementation Order

1. **Project Initialization**: Set up monorepo structure with workspaces
2. **Basic YouTube Processing**: Implement yt-dlp integration in audio service
3. **AI Integration**: Connect Replicate Demucs API for source separation
4. **Database Setup**: Initialize Prisma schema and basic CRUD operations
5. **Frontend Foundation**: Create transcription workflow pages and basic UI

### Validation Checkpoints

- **Week 1**: YouTube → AI separation → basic transcription pipeline working
- **Week 2**: VexFlow notation display with basic editing capabilities
- **Week 3**: WaveSurfer integration with synchronized playback
- **Week 4**: PDF generation and complete user workflow testing

### Success Criteria

- Process 4-minute YouTube song in <2 minutes total time
- Generate professional-quality PDF matching sample documents
- Correction interface accessible to non-musicians
- 90%+ transcription accuracy before human corrections
- Ready for personal church team validation

---

**Architecture Status**: Complete - Ready for Implementation
**Next Phase**: Development Sprint Planning  
**Validation**: Solo developer friendly, team growth ready

```

```
