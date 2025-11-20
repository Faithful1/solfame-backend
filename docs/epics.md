# SolfaMe - Epic Breakdown

**Author:** FAIYATech
**Date:** 2025-11-20
**Project Level:** Medium-High
**Target Scale:** AI-Powered Music Transcription Platform

---

## Overview

This document provides the complete epic and story breakdown for SolfaMe, decomposing the requirements from the [PRD](./prd.md) into implementable stories.

**Living Document Notice:** This is the initial version incorporating PRD requirements and Architecture technical decisions.

---

## Functional Requirements Inventory

From PRD analysis, I've identified the following functional requirements:

- **FR1**: YouTube link input and validation (US1.1)
- **FR2**: Audio extraction and preprocessing from YouTube (US1.2)
- **FR3**: SATB vocal part separation using AI (US2.1)
- **FR4**: Pitch detection and note transcription (US2.2)
- **FR5**: Solfa notation generation (do-re-mi syllables) (US2.3)
- **FR6**: Multi-modal correction via humming interface (US3.1)
- **FR7**: Visual waveform and notation editor (US3.2)
- **FR8**: A/B comparison playback system (US3.3)
- **FR9**: Netflix-style quick approval workflow (US3.4)
- **FR10**: Confidence scoring and error highlighting (US4.1)
- **FR11**: Music theory validation (US4.2)
- **FR12**: Professional PDF output generation (US5.1)
- **FR13**: Customizable layout options for PDF (US5.2)

---

## Epic Structure Summary

Based on natural value delivery boundaries and the PRD user stories, I propose 5 epics:

1. **Epic 1: Foundation & Infrastructure** - Project setup and core technical infrastructure
2. **Epic 2: YouTube Processing Pipeline** - Input handling and audio extraction
3. **Epic 3: AI Transcription Engine** - Source separation and music notation generation
4. **Epic 4: Multi-Modal Correction Interface** - User correction tools and workflow
5. **Epic 5: PDF Generation & Export** - Output formatting and delivery

---

## FR Coverage Map

- **Epic 1**: Foundation for all FRs (infrastructure)
- **Epic 2**: FR1, FR2 (YouTube input and audio processing)
- **Epic 3**: FR3, FR4, FR5 (AI transcription and solfa notation)
- **Epic 4**: FR6, FR7, FR8, FR9, FR10, FR11 (correction interface and quality assurance)
- **Epic 5**: FR12, FR13 (PDF generation and customization)

---

## Epic 1: Foundation & Infrastructure

**Goal:** Establish core technical foundation that enables all subsequent development work. This epic delivers the project structure, basic services, and deployment pipeline needed for a production-ready AI-powered music transcription platform.

### Story 1.1: Project Structure & Monorepo Setup

As a developer,
I want a well-organized monorepo structure with proper workspace configuration,
So that I can efficiently develop and maintain both frontend and backend services.

**Acceptance Criteria:**

**Given** I need to set up the SolfaMe project
**When** I initialize the repository structure
**Then** I have a monorepo with apps/web (Next.js), apps/audio-service (Python FastAPI), and packages/shared
**And** I can run `npm run dev` to start both services concurrently
**And** TypeScript types are shared between frontend and backend via packages/shared
**And** Each service has its own package.json with appropriate dependencies
**And** ESLint and Prettier are configured for consistent code formatting

**Prerequisites:** None (foundational story)

**Technical Notes:**

- Use npm workspaces for monorepo management
- Configure concurrently for multi-service development
- Set up TypeScript project references for cross-package imports
- Include .gitignore for node_modules, .env, and temporary files

### Story 1.2: Database Schema & Prisma Setup

As a developer,
I want a PostgreSQL database with Prisma ORM for managing transcription jobs and user sessions,
So that I can persist application data with type safety and migrations.

**Acceptance Criteria:**

**Given** I need to store transcription jobs and session data
**When** I set up the database layer
**Then** I have a PostgreSQL database with Prisma schema defining TranscriptionJob, UserSession, and Correction models
**And** I can run `prisma migrate dev` to apply schema changes
**And** I have Prisma Client generated with full TypeScript types
**And** Database connection handles connection pooling and error recovery
**And** Seed data script exists for development testing

**Prerequisites:** Story 1.1 (project structure)

**Technical Notes:**

- Use Railway PostgreSQL for development/production
- Schema includes: jobs (id, youtubeUrl, status, audioMetadata), sessions (id, jobId, corrections), corrections (id, method, sectionData)
- Set up database URL environment variable handling

### Story 1.3: Next.js Web App with API Routes

As a developer,
I want a Next.js application with API routes handling HTTP requests,
So that I can serve the frontend and provide backend API functionality in one deployment.

**Acceptance Criteria:**

**Given** I need a web application with API capabilities
**When** I set up the Next.js app
**Then** I have a functioning Next.js 13+ app with TypeScript and Tailwind CSS
**And** API routes are configured in src/app/api/ directory
**And** I have middleware for CORS, error handling, and request logging
**And** Environment variables are properly configured for development and production
**And** The app serves on port 3000 with hot reloading in development

**Prerequisites:** Story 1.1 (project structure)

**Technical Notes:**

- Use Next.js App Router (not Pages Router)
- Configure Tailwind with custom theme for music application UI
- Set up environment validation with zod or similar
- Include basic error boundaries and loading states

### Story 1.4: Python FastAPI Audio Service

As a developer,
I want a Python FastAPI service for audio processing tasks,
So that I can leverage Python's superior audio processing libraries while maintaining fast API performance.

**Acceptance Criteria:**

**Given** I need audio processing capabilities
**When** I set up the FastAPI service
**Then** I have a FastAPI application with endpoints for audio processing
**And** Service includes librosa, yt-dlp, and other audio processing dependencies
**And** I can communicate between Next.js and FastAPI via HTTP API calls
**And** The service handles file uploads, processing queues, and temporary file cleanup
**And** Service runs on port 8000 with auto-reload in development

**Prerequisites:** Story 1.1 (project structure)

**Technical Notes:**

- Use uvicorn as ASGI server
- Include pydantic models for request/response validation
- Set up temporary file handling with automatic cleanup
- Configure CORS for Next.js frontend communication

### Story 1.5: Job Queue & Background Processing

As a developer,
I want a Redis-based job queue system for handling long-running audio processing tasks,
So that I can process transcription jobs asynchronously without blocking the user interface.

**Acceptance Criteria:**

**Given** I need to process audio transcription jobs that take 1-2 minutes
**When** I implement the job queue system
**Then** I have Redis configured with Bull Queue for job management
**And** Jobs can be queued, processed, and their status tracked in real-time
**And** Failed jobs are retried with exponential backoff (max 3 attempts)
**And** Job progress is reported to frontend via WebSocket or polling
**And** Queue dashboard is available for monitoring job status in development

**Prerequisites:** Story 1.2 (database), Story 1.4 (FastAPI service)

**Technical Notes:**

- Use Bull Queue with Redis for Node.js side
- Use Celery or similar for Python worker processes
- Implement job status updates in database via Prisma
- Configure job retention and cleanup policies

### Story 1.6: File Storage & Temporary Asset Management

As a developer,
I want secure cloud storage for temporary audio files and generated PDFs,
So that I can handle file processing without storing copyrighted content permanently.

**Acceptance Criteria:**

**Given** I need to store temporary files during processing
**When** I implement file storage
**Then** I have AWS S3 or similar cloud storage configured for temporary files
**And** Files are automatically deleted after 24 hours using lifecycle policies
**And** Signed URLs provide secure access to files without exposing storage credentials
**And** File upload/download includes progress tracking and error handling
**And** Storage costs are minimized through appropriate bucket configuration

**Prerequisites:** Story 1.3 (Next.js app), Story 1.4 (FastAPI service)

**Technical Notes:**

- Use AWS S3 with bucket lifecycle rules for auto-deletion
- Implement pre-signed URLs for secure file access
- Configure bucket CORS for frontend file uploads
- Include file type validation and size limits

### Story 1.7: Development & Deployment Pipeline

As a developer,
I want automated testing and deployment pipeline,
So that I can confidently deploy changes and maintain code quality.

**Acceptance Criteria:**

**Given** I need reliable deployment and testing
**When** I set up the CI/CD pipeline
**Then** I have GitHub Actions configured for running tests on pull requests
**And** Deployment automatically triggers on main branch push to Vercel (frontend) and Railway (backend)
**And** Environment variables are properly configured for staging and production
**And** Database migrations run automatically during deployment
**And** Health check endpoints verify service status post-deployment

**Prerequisites:** All previous stories (1.1-1.6)

**Technical Notes:**

- Use Vercel for Next.js deployment with preview deployments
- Use Railway for FastAPI and PostgreSQL hosting
- Configure environment-specific variable management
- Include smoke tests for deployment verification

---

## Epic 2: YouTube Processing Pipeline

**Goal:** Enable users to input YouTube links and extract high-quality audio for AI processing. This epic delivers the first user-visible functionality where church musicians can start the transcription process by simply pasting a YouTube URL.

### Story 2.1: YouTube URL Input Interface

As a church keyboardist,
I want a simple web interface where I can paste any YouTube link,
So that I can quickly start transcribing songs without dealing with complex file uploads.

**Acceptance Criteria:**

**Given** I am on the SolfaMe homepage
**When** I paste a YouTube URL into the input field
**Then** The system validates the URL format (youtube.com, youtu.be, mobile links)
**And** I see song metadata displayed (title, duration, thumbnail)
**And** Invalid URLs show clear error messages ("Invalid YouTube link" or "Video not accessible")
**And** The input field handles various URL formats gracefully
**And** A "Start Transcription" button becomes enabled after successful validation

**Prerequisites:** Story 1.3 (Next.js web app)

**Technical Notes:**

- Use React Hook Form for form validation
- Implement YouTube URL regex patterns for validation
- Call YouTube Data API or yt-dlp for metadata extraction
- Include loading states during validation
- Handle private/restricted video errors gracefully

### Story 2.2: YouTube Metadata Extraction & Validation

As a user,
I want the system to automatically fetch and display song information,
So that I can verify I'm transcribing the correct song before processing begins.

**Acceptance Criteria:**

**Given** I have entered a valid YouTube URL
**When** The system fetches metadata
**Then** I see the song title, artist (if available), duration, and thumbnail
**And** Duration is validated (2-10 minutes for MVP, with clear messaging for out-of-range videos)
**And** Copyright-restricted or unavailable videos show appropriate warnings
**And** Processing estimation is shown ("Estimated processing time: 1-2 minutes")
**And** I can confirm or cancel before starting the transcription job

**Prerequisites:** Story 2.1 (URL input interface)

**Technical Notes:**

- Use yt-dlp for robust metadata extraction
- Implement duration validation with user-friendly error messages
- Cache metadata temporarily to avoid repeated API calls
- Handle edge cases: private videos, geo-blocked content, deleted videos

### Story 2.3: Audio Extraction Service

As a system,
I want to extract high-quality audio from YouTube videos,
So that I can provide optimal input for AI source separation algorithms.

**Acceptance Criteria:**

**Given** A user has confirmed transcription of a valid YouTube video
**When** The audio extraction process begins
**Then** Audio is extracted at 44.1kHz/16-bit quality (CD quality) or best available
**And** Extraction completes within 30 seconds for typical 4-minute songs
**And** Progress is reported to the user ("Extracting audio... 45%")
**And** Extracted audio is temporarily stored with secure access
**And** Copyright compliance is maintained (no permanent storage)

**Prerequisites:** Story 1.4 (FastAPI audio service), Story 1.6 (file storage)

**Technical Notes:**

- Use yt-dlp with specific audio format preferences (wav/flac preferred)
- Implement extraction progress tracking via websockets or polling
- Store extracted audio in S3 with 24-hour auto-deletion
- Include error handling for extraction failures
- Respect YouTube's terms of service

### Story 2.4: Audio Preprocessing & Quality Enhancement

As a system,
I want to preprocess extracted audio for optimal AI transcription results,
So that the source separation algorithm receives the best possible input quality.

**Acceptance Criteria:**

**Given** Raw audio has been extracted from YouTube
**When** Preprocessing begins
**Then** Audio is normalized to consistent volume levels (-23 LUFS target)
**And** Background noise is reduced using spectral subtraction
**And** Audio is converted to mono if stereo (vocals typically centered)
**And** Sample rate is standardized to 22kHz for AI processing efficiency
**And** Processing preserves vocal frequencies (80Hz-8kHz range prioritized)

**Prerequisites:** Story 2.3 (audio extraction)

**Technical Notes:**

- Use librosa for audio preprocessing in FastAPI service
- Implement loudness normalization using pyloudnorm
- Apply gentle noise reduction to preserve vocal quality
- Convert stereo to mono by extracting center channel
- Include quality metrics reporting for monitoring

### Story 2.5: Job Queue Integration & Status Tracking

As a user,
I want real-time updates on my transcription job progress,
So that I know the system is working and can estimate when results will be ready.

**Acceptance Criteria:**

**Given** I have started a transcription job
**When** Processing begins
**Then** I see a progress interface with clear status updates
**And** Status progresses through: "Extracting audio" → "Preprocessing" → "AI processing" → "Ready for review"
**And** Each stage shows percentage completion where applicable
**And** Estimated time remaining is displayed and updated
**And** I can leave the page and return to check progress later
**And** Failed jobs show clear error messages with retry options

**Prerequisites:** Story 1.5 (job queue), Story 2.4 (audio preprocessing)

**Technical Notes:**

- Use Bull Queue for job management with progress reporting
- Implement WebSocket for real-time updates or polling fallback
- Store job status in database for persistence across page reloads
- Include retry mechanism with exponential backoff
- Add job timeout handling (max 5 minutes per job)

### Story 2.6: Error Handling & User Communication

As a user,
I want clear, helpful error messages when something goes wrong,
So that I understand what happened and what I can do about it.

**Acceptance Criteria:**

**Given** An error occurs during YouTube processing
**When** The system encounters the error
**Then** I see a user-friendly error message explaining what went wrong
**And** Suggested actions are provided ("Try a different video" or "Video may be restricted")
**And** Technical details are logged but not shown to users
**And** Common errors have specific messaging (private videos, copyright blocks, network issues)
**And** I can easily try again or contact support if needed

**Prerequisites:** All previous Epic 2 stories

**Technical Notes:**

- Implement comprehensive error categorization and messaging
- Use structured logging for debugging while keeping user messages simple
- Include error recovery suggestions based on error type
- Add Sentry or similar for error monitoring
- Create error message templates for common failure scenarios

---

## Epic 3: AI Transcription Engine

**Goal:** Transform preprocessed audio into SATB musical notation with solfa syllables using AI-powered source separation and pitch detection. This epic delivers the core transcription functionality that converts raw audio into the musical elements needed for choir arrangements.

### Story 3.1: AI Source Separation Integration

As a system,
I want to integrate with third-party AI services to separate vocals into SATB parts,
So that I can identify individual vocal lines from mixed audio recordings.

**Acceptance Criteria:**

**Given** Preprocessed audio is ready for AI processing
**When** Source separation begins
**Then** Audio is sent to LALAL.AI or Replicate Demucs API for vocal separation
**And** Service returns 4 separated audio tracks (Soprano, Alto, Tenor, Bass) when possible
**And** Confidence scores are provided for each separated track quality
**And** Processing completes within 60 seconds for 4-minute songs
**And** Fallback handling occurs when fewer than 4 distinct parts are detected
**And** API errors are handled gracefully with retry logic (max 3 attempts)

**Prerequisites:** Story 2.4 (audio preprocessing)

**Technical Notes:**

- Integrate LALAL.AI API or Replicate Demucs model via FastAPI service
- Implement API key management and usage tracking
- Store separated tracks temporarily in S3 with secure access
- Handle API rate limits and service downtime gracefully
- Include quality assessment of separated tracks

### Story 3.2: Pitch Detection & MIDI Conversion

As a system,
I want to detect pitches from each separated vocal track and convert them to MIDI note data,
So that I can represent melodies in a format suitable for musical notation.

**Acceptance Criteria:**

**Given** I have separated SATB audio tracks
**When** Pitch detection runs on each track
**Then** Pitches are detected using Spotify Basic-Pitch or Crepe algorithm
**And** Note onsets and durations are identified with 90% target accuracy
**And** Results are converted to MIDI note format (note number, velocity, timing)
**And** Vocal range validation ensures notes stay within SATB limits (C3-C6)
**And** Confidence scores are assigned to each detected note
**And** Processing handles polyphonic passages and chord detection

**Prerequisites:** Story 3.1 (source separation)

**Technical Notes:**

- Use Basic-Pitch or Crepe for pitch detection in Python
- Implement note onset detection using librosa
- Convert frequency data to MIDI note numbers with proper octave mapping
- Apply SATB range filters: Soprano (C4-C6), Alto (G3-G5), Tenor (C3-G4), Bass (E2-E4)
- Store MIDI data in structured format for notation conversion

### Story 3.3: Key Signature Detection & Music Theory Analysis

As a system,
I want to detect the key signature and apply music theory rules,
So that I can generate accurate solfa notation and ensure harmonic correctness.

**Acceptance Criteria:**

**Given** MIDI note data from all SATB parts
**When** Music theory analysis runs
**Then** Key signature is detected using chord progression analysis
**And** Scale degrees are identified for solfa mapping (do, re, mi, fa, sol, la, ti)
**And** Key changes within the song are detected and handled appropriately
**And** Accidentals are identified and marked for solfa modification
**And** Chord progressions are analyzed for harmonic validation
**And** Results include confidence scores for key detection accuracy

**Prerequisites:** Story 3.2 (pitch detection)

**Technical Notes:**

- Use music21 library for key signature detection and analysis
- Implement Krumhansl-Schmuckler key-finding algorithm
- Handle both major and minor keys with appropriate solfa systems
- Detect modulations and key changes throughout the piece
- Validate chord progressions for common harmonic patterns

### Story 3.4: Musical Notation Generation

As a system,
I want to convert MIDI data to standard musical notation,
So that users can see and edit the transcription in familiar sheet music format.

**Acceptance Criteria:**

**Given** Analyzed MIDI data with key signature and timing
**When** Notation generation begins
**Then** Notes are converted to standard musical notation (treble/bass clefs)
**And** Rhythms are quantized to common note values (whole, half, quarter, eighth notes)
**And** Time signature is detected and applied (4/4, 3/4, 6/8, etc.)
**And** Measures are properly barred with appropriate line breaks
**And** Clef assignments follow SATB conventions (treble for S/A, bass for T/B)
**And** Notation is optimized for choir readability (appropriate note spacing, beam groupings)

**Prerequisites:** Story 3.3 (music theory analysis)

**Technical Notes:**

- Use music21 for notation generation and formatting
- Implement rhythm quantization with configurable precision
- Apply proper beaming rules for readability
- Handle tied notes across measure boundaries
- Generate notation in MusicXML format for compatibility

### Story 3.5: Solfa Notation Mapping

As a church musician,
I want solfa syllables (do-re-mi-fa-sol-la-ti-do) displayed under each note,
So that choir members can learn their parts using the solfa system.

**Acceptance Criteria:**

**Given** Musical notation with confirmed key signature
**When** Solfa mapping is applied
**Then** Each note receives the correct solfa syllable based on scale degree
**And** Movable-do system is used (do = tonic of current key)
**And** Accidentals are handled with chromatic solfa (di, ri, fi, si, le, te)
**And** Key changes update solfa syllables appropriately
**And** Syllables are positioned clearly under corresponding notes
**And** Alternative syllables are provided for common variations (ti vs si)

**Prerequisites:** Story 3.4 (notation generation)

**Technical Notes:**

- Implement movable-do solfa system with chromatic alterations
- Handle both major and minor key solfa mappings
- Support traditional and contemporary solfa syllable preferences
- Position syllables with proper typography and spacing
- Include solfa validation against music theory rules

### Story 3.6: Confidence Scoring & Quality Assessment

As a system,
I want to assess and report confidence levels for each transcription element,
So that users can identify sections that may need correction and prioritize their review efforts.

**Acceptance Criteria:**

**Given** Complete transcription with notation and solfa
**When** Quality assessment runs
**Then** Confidence scores are calculated for pitch accuracy (0-100%)
**And** Rhythm accuracy confidence is assessed based on onset detection
**And** Harmonic analysis confidence indicates chord progression likelihood
**And** Overall transcription quality score combines all metrics
**And** Low-confidence sections are flagged for user review
**And** Color-coded visualization shows confidence levels (green/yellow/red)

**Prerequisites:** All previous Epic 3 stories

**Technical Notes:**

- Combine confidence metrics from source separation, pitch detection, and theory analysis
- Implement weighted scoring based on multiple quality indicators
- Use statistical analysis to identify outliers and anomalies
- Store confidence data for correction interface prioritization
- Generate quality reports for monitoring algorithm performance

---

## Epic 4: Multi-Modal Correction Interface

**Goal:** Provide multiple intuitive correction methods that allow church musicians to perfect AI transcriptions regardless of their musical notation expertise. This epic delivers SolfaMe's key differentiator - making professional-quality transcription correction accessible to users without advanced musical training.

### Story 4.1: Audio Playback & Navigation System

As a user reviewing transcription results,
I want to play back the original audio and separated parts with synchronized visual feedback,
So that I can hear what the AI detected and identify sections needing correction.

**Acceptance Criteria:**

**Given** I have a completed AI transcription with separated SATB parts
**When** I access the correction interface
**Then** I can play/pause the original audio and each separated SATB track independently
**And** Audio playback is synchronized with visual notation display (scrolling score)
**And** I can click on any measure to jump to that position in the audio
**And** Playback controls include volume sliders for each SATB part
**And** Current playback position is clearly indicated on the notation
**And** I can loop sections for focused correction (select start/end points)

**Prerequisites:** Story 3.6 (confidence scoring and quality assessment)

**Technical Notes:**

- Use Tone.js for web audio playback with multi-track support
- Implement audio scrubbing with smooth seeking
- Synchronize audio position with visual notation scroll
- Support simultaneous playback of multiple tracks with individual volume control
- Include keyboard shortcuts for common playback operations (spacebar = play/pause)

### Story 4.2: Confidence-Based Error Highlighting

As a user focused on correction efficiency,
I want to see which sections the AI is uncertain about,
So that I can prioritize my correction efforts on the areas most likely to need work.

**Acceptance Criteria:**

**Given** The AI transcription includes confidence scores for each element
**When** I view the correction interface
**Then** Notes and sections are color-coded by confidence level (green=high, yellow=medium, red=low)
**And** I can filter the view to show only low-confidence sections
**And** A prioritized list shows the lowest-confidence sections first
**And** Confidence tooltips explain why certain areas were flagged
**And** I can adjust confidence thresholds to customize what's highlighted
**And** Bulk actions allow me to navigate quickly between flagged sections

**Prerequisites:** Story 4.1 (audio playback system)

**Technical Notes:**

- Implement color-coding with accessibility-friendly contrast ratios
- Use CSS filters/overlays for visual confidence indicators
- Create sortable/filterable interface for prioritized correction workflow
- Store user preference for confidence threshold settings
- Include confidence legend and explanation for users

### Story 4.3: Humming Correction Interface

As a church musician with limited notation skills,
I want to hum the correct melody and have the system update the transcription,
So that I can fix pitch errors using my ear rather than needing to understand music theory.

**Acceptance Criteria:**

**Given** I identify a section with incorrect pitches
**When** I use the humming correction feature
**Then** I can select a section of notation (start/end measures) for correction
**And** Clicking "Record Correction" activates my microphone with clear visual feedback
**And** I can hum the correct melody while seeing real-time pitch detection
**And** Visual feedback shows detected pitches as I hum (pitch curve display)
**And** I can review the hummed correction before applying it to the notation
**And** Applying the correction updates the notation and solfa syllables automatically

**Prerequisites:** Story 4.2 (error highlighting)

**Technical Notes:**

- Use Web Audio API for microphone access with user permission handling
- Implement real-time pitch detection using Aubio.js or similar
- Display pitch detection with visual feedback (moving pitch indicator)
- Convert hummed frequencies to MIDI notes with proper quantization
- Update both notation and solfa mapping when corrections are applied
- Include recording quality validation and retry options

### Story 4.4: Visual Waveform & Notation Editor

As a user wanting precise control,
I want to see audio waveforms alongside notation and make direct edits,
So that I can fine-tune timing and pitch details with visual precision.

**Acceptance Criteria:**

**Given** I need to make precise corrections to timing or pitch
**When** I use the visual editor
**Then** I see synchronized waveform and notation displays side by side
**And** I can click and drag notes to adjust pitch (vertical movement)
**And** I can click and drag note boundaries to adjust timing (horizontal movement)
**And** Waveform cursor follows audio playback and notation selection
**And** Zoom controls allow detailed editing at measure or note level
**And** Undo/redo functionality tracks all edits with clear history
**And** Changes immediately update the audio playback for verification

**Prerequisites:** Story 4.3 (humming correction)

**Technical Notes:**

- Use WaveSurfer.js or similar for waveform visualization
- Implement drag-and-drop note editing with snap-to-grid options
- Synchronize waveform timeline with notation measure positions
- Include zoom levels: full song, section (4-8 measures), measure, beat
- Store edit history for undo/redo with efficient data structures
- Real-time audio synthesis for immediate playback of edits

### Story 4.5: A/B Comparison System

As a quality-focused user,
I want to compare the original audio with the AI-generated version side by side,
So that I can verify accuracy and identify discrepancies before making corrections.

**Acceptance Criteria:**

**Given** I want to verify transcription accuracy against the original
**When** I use the A/B comparison feature
**Then** I have side-by-side playback controls for "Original" and "AI Transcription"
**And** Both versions can play simultaneously or independently with sync controls
**And** Visual indicators clearly show which version is currently playing
**And** I can switch between versions instantly during playback (seamless transitions)
**And** Section-by-section comparison allows focused analysis (4-8 measure segments)
**And** Volume controls are independent for each version to balance levels
**And** Playback speed can be adjusted (0.5x to 2x) for detailed analysis

**Prerequisites:** Story 4.4 (visual editor)

**Technical Notes:**

- Implement synchronized dual-audio playback with precise timing control
- Generate AI-synthesized audio from corrected notation for comparison
- Use Web Audio API for real-time audio processing and mixing
- Include crossfading between versions for smooth A/B switching
- Support variable playback speed without pitch shifting
- Store comparison preferences (volume levels, playback speed)

### Story 4.6: Netflix-Style Section Approval

As a user working efficiently through corrections,
I want to quickly approve sections that sound correct and focus time on problem areas,
So that I can optimize my correction workflow and avoid unnecessary work.

**Acceptance Criteria:**

**Given** I am reviewing the transcription section by section
**When** I use the approval workflow
**Then** The transcription is divided into logical sections (4-8 measures each)
**And** Each section shows "Needs Review" / "Approved" / "Needs Work" status
**And** I can quickly approve good sections with a single click or keyboard shortcut
**And** Visual progress indicator shows overall approval status (e.g., "12/16 sections approved")
**And** I can bulk approve multiple consecutive sections at once
**And** Navigation automatically moves to the next unapproved section
**And** Approved sections are visually distinct but remain editable if needed

**Prerequisites:** Story 4.5 (A/B comparison)

**Technical Notes:**

- Implement keyboard shortcuts for rapid approval workflow (A=approve, N=needs work, Space=next)
- Store approval status in database with user session persistence
- Use visual styling to distinguish approved vs. pending sections
- Include bulk selection interface for multi-section operations
- Auto-save approval status to prevent lost work
- Generate completion percentage and workflow progress metrics

### Story 4.7: Music Theory Validation & Smart Suggestions

As a user creating choir arrangements,
I want the system to flag potential music theory issues and suggest corrections,
So that I can catch errors that might affect choir performance quality.

**Acceptance Criteria:**

**Given** I have made corrections to the transcription
**When** Music theory validation runs
**Then** The system flags notes outside typical SATB vocal ranges with warnings
**And** Parallel fifths and octaves in four-part harmony are identified
**And** Unusual interval leaps are highlighted for review (>octave jumps flagged)
**And** Key signature inconsistencies are detected and reported
**And** Smart suggestions offer corrections for common issues
**And** Validation rules can be configured based on user expertise level
**And** I can accept/reject suggestions or disable specific validation rules

**Prerequisites:** Story 4.6 (section approval)

**Technical Notes:**

- Implement music theory rules engine using music21 library
- Create configurable validation profiles (beginner, intermediate, advanced)
- Generate contextual suggestions based on harmonic analysis
- Use non-intrusive UI for warnings (tooltips, sidebar panel)
- Store user preferences for enabled/disabled validation rules
- Include educational explanations for flagged issues

---

## Epic 5: PDF Generation & Export

**Goal:** Generate professional-quality PDF sheet music that matches church standards for printing and distribution. This epic delivers the final output that enables church teams to use SolfaMe transcriptions in actual worship services and choir practice.

### Story 5.1: Professional Sheet Music Layout Engine

As a choir director,
I want PDF output that matches professional sheet music standards,
So that I can confidently distribute arrangements to my choir without quality concerns.

**Acceptance Criteria:**

**Given** I have completed and approved a transcription
**When** I generate the PDF output
**Then** Sheet music follows professional engraving standards (proper spacing, alignment, typography)
**And** SATB parts are clearly arranged with appropriate clefs (treble for S/A, bass for T/B)
**And** Measures are evenly spaced with consistent bar lines and page breaks
**And** Lyrics are positioned properly with syllable alignment under notes
**And** Solfa syllables appear clearly under notes without crowding the staff
**And** Page layout optimizes for 8.5x11" printing with appropriate margins
**And** Multiple pages handle system breaks and page turns logically

**Prerequisites:** Story 4.7 (music theory validation)

**Technical Notes:**

- Use music21 or MuseScore for professional notation rendering
- Implement proper music engraving rules (spacing ratios, beam angles, stem directions)
- Generate high-resolution PDF (300 DPI minimum) for print quality
- Include font embedding for consistent display across devices
- Handle multi-page layouts with logical system and page breaks

### Story 5.2: SATB Part Arrangement & Individual Sheets

As a choir member,
I want both individual part sheets and a combined SATB score,
So that I can practice my specific part and see how it fits with the full arrangement.

**Acceptance Criteria:**

**Given** The transcription includes all four SATB parts
**When** PDF generation creates the output package
**Then** Combined score shows all four parts in grand staff format
**And** Individual part sheets are generated for Soprano, Alto, Tenor, and Bass
**And** Each part sheet includes cue notes from other voices at important entrances
**And** Page headers clearly identify the part name and song title
**And** Measure numbers are consistent across all versions
**And** Key signature and time signature are prominently displayed
**And** Tempo marking and any performance notes are included on all sheets

**Prerequisites:** Story 5.1 (layout engine)

**Technical Notes:**

- Generate separate PDF files for combined score and individual parts
- Implement cue note logic to show important harmonic or rhythmic cues
- Use consistent page numbering and header formatting
- Include metadata in PDF properties (title, composer, arranger)
- Optimize individual part layouts for single-voice readability

### Story 5.3: Solfa Notation Integration & Typography

As a church musician using solfa method,
I want solfa syllables clearly positioned and formatted for easy reading,
So that choir members can learn parts using the do-re-mi system effectively.

**Acceptance Criteria:**

**Given** The transcription includes solfa syllable mapping
**When** PDF is generated with solfa notation enabled
**Then** Solfa syllables (do, re, mi, fa, sol, la, ti) appear under each note
**And** Syllable font size is appropriate for reading while singing (12-14pt)
**And** Chromatic alterations use proper solfa (di, ri, fi, si, le, te)
**And** Syllables align precisely with note heads, not stems or beams
**And** Key changes update solfa appropriately (movable-do system)
**And** Option to hide/show solfa syllables for flexibility
**And** Syllables don't interfere with lyrics or other musical elements

**Prerequisites:** Story 5.2 (SATB arrangement)

**Technical Notes:**

- Implement precise text positioning algorithms for syllable placement
- Use consistent font family and size for solfa text throughout document
- Handle syllable collisions with lyrics, dynamics, and other text
- Support both traditional and contemporary solfa syllable preferences
- Include toggle option for solfa display in PDF generation settings

### Story 5.4: Customizable Layout & Formatting Options

As a user with specific choir needs,
I want basic layout options for PDF output,
So that I can adapt the format to my team's preferences and printing requirements.

**Acceptance Criteria:**

**Given** I am ready to generate the final PDF
**When** I access formatting options
**Then** I can choose font size options (Large, Medium, Small) for different reading needs
**And** Page orientation can be set to Portrait or Landscape
**And** I can toggle solfa syllables on/off for the entire document
**And** Header customization allows church name, date, and arranger credits
**And** Measure numbering can be enabled/disabled or set to every N measures
**And** Margin settings can be adjusted for different printers
**And** I can preview changes before final PDF generation

**Prerequisites:** Story 5.3 (solfa integration)

**Technical Notes:**

- Create settings interface with live preview of formatting changes
- Implement responsive layout that adapts to different font sizes
- Store user preferences for layout settings
- Validate settings to prevent layout issues (e.g., margins too small)
- Include presets for common use cases (practice vs performance, young vs adult choir)

### Story 5.5: Metadata & Copyright Information

As a responsible user,
I want proper attribution and metadata in the PDF,
So that I maintain copyright compliance and provide appropriate credits.

**Acceptance Criteria:**

**Given** I am generating the final PDF output
**When** The PDF is created
**Then** PDF metadata includes song title, original source (YouTube URL), and generation date
**And** Copyright notice appears on first page with appropriate educational use language
**And** Transcription credits show "Transcribed by SolfaMe AI" with user name if provided
**And** Original artist/composer information is included when available from YouTube metadata
**And** PDF properties include searchable tags and creation information
**And** Contact information or website is included for questions about the transcription
**And** Clear statement about transcription accuracy and human review recommendations

**Prerequisites:** Story 5.4 (layout options)

**Technical Notes:**

- Embed comprehensive PDF metadata for document management
- Include legal disclaimer text template that can be customized
- Format copyright and attribution information professionally
- Store metadata in both PDF properties and visible text
- Include QR code or link back to original source for verification

### Story 5.6: Download & Sharing Interface

As a user completing a transcription,
I want easy access to download and share the PDF outputs,
So that I can quickly distribute materials to my choir team.

**Acceptance Criteria:**

**Given** PDF generation has completed successfully
**When** I access the download interface
**Then** I can download a ZIP package containing all PDF files (combined score + individual parts)
**And** Individual PDFs can be downloaded separately if needed
**And** Download includes preview thumbnails of each PDF page
**And** File names are descriptive and consistent (e.g., "Amazing_Grace_SATB_Combined.pdf")
**And** Download links remain accessible for 24 hours before cleanup
**And** I can regenerate PDFs with different settings without losing the transcription
**And** Email sharing option allows sending download links to choir members

**Prerequisites:** Story 5.5 (metadata and copyright)

**Technical Notes:**

- Generate secure download URLs with expiration times
- Create ZIP packages dynamically with properly named files
- Implement email sharing with download link distribution
- Include download progress indicators for large files
- Store generated PDFs temporarily with automatic cleanup after 24 hours
- Provide regeneration capability without re-running AI transcription

---

## Complete Epic Breakdown Summary

### FR Coverage Matrix

| Epic                             | Stories   | FR Coverage                    | User Value Delivered                                               |
| -------------------------------- | --------- | ------------------------------ | ------------------------------------------------------------------ |
| **Epic 1: Foundation**           | 7 stories | Infrastructure for all FRs     | Development environment ready                                      |
| **Epic 2: YouTube Processing**   | 6 stories | FR1, FR2                       | Users can input YouTube links and see processing progress          |
| **Epic 3: AI Transcription**     | 6 stories | FR3, FR4, FR5                  | Users get AI-generated SATB notation with solfa syllables          |
| **Epic 4: Correction Interface** | 7 stories | FR6, FR7, FR8, FR9, FR10, FR11 | Users can perfect transcriptions using multiple correction methods |
| **Epic 5: PDF Export**           | 6 stories | FR12, FR13                     | Users get print-ready sheet music for church use                   |

### Complete Functional Requirements Coverage

✅ **All 13 functional requirements covered across 32 stories**

- **FR1**: YouTube link input and validation → Epic 2, Story 2.1
- **FR2**: Audio extraction and preprocessing → Epic 2, Stories 2.3-2.4
- **FR3**: SATB vocal part separation using AI → Epic 3, Story 3.1
- **FR4**: Pitch detection and note transcription → Epic 3, Story 3.2
- **FR5**: Solfa notation generation → Epic 3, Story 3.5
- **FR6**: Multi-modal correction via humming → Epic 4, Story 4.3
- **FR7**: Visual waveform and notation editor → Epic 4, Story 4.4
- **FR8**: A/B comparison playback system → Epic 4, Story 4.5
- **FR9**: Netflix-style quick approval workflow → Epic 4, Story 4.6
- **FR10**: Confidence scoring and error highlighting → Epic 4, Story 4.2
- **FR11**: Music theory validation → Epic 4, Story 4.7
- **FR12**: Professional PDF output generation → Epic 5, Stories 5.1-5.2
- **FR13**: Customizable layout options for PDF → Epic 5, Story 5.4

### Epic Structure Validation ✅

**User Value Check:** Each epic delivers tangible user value

- **Epic 1**: Foundation exception (necessary for greenfield project)
- **Epic 2**: Users can start transcriptions and see progress
- **Epic 3**: Users receive AI-generated musical notation
- **Epic 4**: Users can correct and perfect transcriptions
- **Epic 5**: Users get print-ready sheet music for church use

**Story Quality Check:** All stories are vertically sliced and appropriately sized

- Each story delivers complete functionality within its scope
- No forward dependencies exist (only backward references)
- Stories sized for single dev agent completion
- BDD acceptance criteria are clear and testable

---

_This epic breakdown is now complete and ready for Phase 4 implementation. The structure incorporates PRD requirements and Architecture technical decisions, providing detailed guidance for development agents to implement SolfaMe's AI-powered music transcription platform._
