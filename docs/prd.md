# SolfaMe - Product Requirements Document

**Author:** FAIYATech
**Date:** 2025-11-20
**Version:** 1.0

---

## Executive Summary

SolfaMe democratizes music transcription for church teams and choirs by using AI to automatically convert any YouTube song into professional-quality SATB arrangements with solfa notation. Built by a church keyboardist who experienced firsthand the pressure of being expected to transcribe songs without proper training, SolfaMe eliminates the transcription bottleneck that limits many church teams' musical repertoire.

The MVP focuses on single-song processing with speed and quality as primary goals: users input a YouTube link and receive print-ready PDF arrangements in seconds, not hours. The platform features a sophisticated multi-modal correction interface allowing users to perfect transcriptions through humming, visual editing, and A/B comparisons - ensuring 90% accuracy without requiring musical expertise.

**Vision:** Empower every church team to confidently learn any song, regardless of their transcription skills, expanding musical horizons across the church community.

### What Makes This Special

**Authentic Problem-Solution Fit**: Built by a church keyboardist solving their own daily frustration - being expected to transcribe songs without having transcription skills. This authentic experience ensures the solution addresses real church musician pain points.

**Multi-Modal Correction Innovation**: Revolutionary approach combining humming corrections, visual editing, A/B comparison, and Netflix-style approval - making transcription accessible to users without musical notation expertise.

**Quality-First Philosophy**: Designed for church musicians who value precision over speed, with 90% accuracy targets and comprehensive review tools rather than quick-but-imperfect results.

---

## Project Classification

**Technical Type:** Web Application (AI-Powered SaaS)
**Domain:** Music Education Technology (EdTech/Church Tech)
**Complexity:** Medium-High (AI Integration + Music Theory + PDF Generation)

**Project Context**: Greenfield solo development project focused on solving authentic church musician pain points through accessible AI-powered music transcription.

**Development Approach**: Leverage proven AI services rather than building ML infrastructure, focusing competitive advantage on correction interface and church-specific user experience.

---

## Success Criteria

**Personal Success Metrics:**

- Ability to confidently say "yes" when church team asks about learning new songs
- Elimination of stress and time pressure around transcription requests
- Church successfully using SolfaMe-generated materials for worship services

**Community Impact Goals:**

- Churches expanding their musical repertoire beyond transcription bottlenecks
- Keyboardists and music directors feeling confident regardless of transcription skills
- Democratic access to quality arrangements for any church team

**Product Success Indicators:**

- 90%+ user satisfaction with generated PDF outputs
- Church musicians actively recommending SolfaMe to other teams
- Word-of-mouth adoption through church musician networks

**MVP Validation Criteria:**

- Own church team successfully uses SolfaMe for Sunday services
- Generated PDFs match quality expectations of sample documents
- Processing time meets "seconds not minutes" user expectation

---

## Product Scope

### MVP - Minimum Viable Product

**Core User Flow:**

1. User pastes YouTube link into web interface
2. AI processes song and separates into SATB parts with 90% target accuracy
3. User reviews and corrects transcription using multi-modal interface
4. System generates print-ready PDF with solfa notation matching sample format
5. User downloads and shares with church team

**Essential Features:**

- **YouTube Link Input**: Simple URL input with song validation
- **AI Source Separation**: Automatic SATB vocal part separation
- **Solfa Notation Generation**: Do-re-mi syllable mapping under notes
- **Multi-Modal Correction Interface**:
  - Hum corrections for pitch fixes
  - Visual waveform + notation editor for precision control
  - A/B comparison (original vs AI-generated) for verification
  - Netflix-style quick approval for mostly-correct sections
- **Professional PDF Output**: Church-ready formatting with individual parts, combined score, lyrics, and solfa notation
- **Quality-First Workflow**: Comprehensive review tools optimized for 15-20 minute correction sessions

**Non-Functional Requirements:**

- **Processing Speed**: Target seconds rather than minutes for competitive advantage
- **Quality Standard**: 90% transcription accuracy before human correction
- **User Experience**: Accessible to church musicians without advanced musical training
- **Output Quality**: PDF format matching provided sample documents exactly
- **Solo Development Friendly**: Architecture manageable for single developer

### Growth Features (Post-MVP)

**Enhanced User Experience:**

- User pattern learning (AI adapts to individual correction preferences)
- Batch processing for multiple songs
- Song library with previously processed arrangements
- User accounts and transcription history

**Advanced Correction Tools:**

- Community correction sharing (collaborative improvement)
- Advanced music theory validation
- Tempo and key signature detection and adjustment
- Multiple arrangement styles (contemporary vs traditional)

**Platform Expansion:**

- Mobile-responsive interface
- Offline correction capabilities
- Integration with church management systems
- Advanced export formats (MIDI, MusicXML)

### Vision (Future)

**Comprehensive Church Music Platform:**

- Real-time collaborative arrangement editing
- AI-generated practice tracks and backing vocals
- Integration with streaming platforms beyond YouTube
- Live performance mode with click tracks and guides
- Advanced harmonic analysis and suggestion engine
- Community marketplace for custom arrangements

---

## Domain-Specific Requirements

**Music Theory Compliance:**

- Accurate solfa notation mapping (do-re-mi-fa-sol-la-ti-do system)
- SATB voice range validation and optimization
- Key signature detection and transposition capabilities
- Rhythm and timing accuracy for practical choir use

**Church Music Workflow Integration:**

- PDF output optimized for printing and sharing
- Format compatibility with typical church presentation systems
- Consideration for varying musical skill levels within church teams
- Respect for worship service preparation timelines

**Copyright and Licensing Considerations:**

- Clear guidelines for fair use in church contexts
- Educational use compliance for transcription activities
- Transparent copyright responsibility communication
- Future integration capability with licensing services

This domain expertise shapes all functional and technical requirements below, ensuring the product serves real church musician workflows effectively.

---

## Innovation & Novel Patterns

**Multi-Modal Correction Interface:**
Revolutionary approach to music transcription correction that makes high-quality results accessible to users without extensive musical training. Combines multiple interaction methods to accommodate different user skills and preferences.

**AI-Guided Correction Method Selection:**
Intelligent system that learns user patterns and suggests optimal correction methods based on error types, user preferences, and confidence levels. This personalization makes the tool increasingly effective with use.

**Quality-First Processing:**
Unlike speed-focused transcription tools, SolfaMe prioritizes accuracy and user control, designed for situations where transcription quality directly impacts worship experience.

### Validation Approach

**Phase 1: Personal Validation**

- Test with own church team for real Sunday service use
- Validate PDF output quality against sample documents
- Confirm processing speed meets user expectations

**Phase 2: Church Musician Beta**

- Deploy with 5-10 friendly church musicians
- Gather feedback on correction interface usability
- Validate cross-church team adoption patterns

**Phase 3: Community Launch**

- Share through church musician networks
- Monitor word-of-mouth adoption and recommendation patterns
- Iterate based on real-world usage scenarios

---

## Functional Requirements

### User Stories & Acceptance Criteria

#### Epic 1: YouTube Song Input & Processing

**US1.1: YouTube Link Input**
_As a church keyboardist, I want to paste any YouTube link and have the system validate and accept it, so I can quickly start the transcription process._

**Acceptance Criteria:**

- User can paste YouTube URL in various formats (youtube.com, youtu.be, mobile links)
- System validates URL and extracts video metadata (title, duration)
- Clear error messages for invalid or inaccessible videos
- Processing starts automatically after successful validation
- Maximum song length validation (e.g., 10 minutes for MVP)

**US1.2: Audio Extraction & Preprocessing**
_As a user, I want the system to automatically extract audio from YouTube and prepare it for AI processing, so I don't need technical knowledge about audio formats._

**Acceptance Criteria:**

- System extracts audio in optimal quality for AI processing
- Handles various YouTube audio qualities gracefully
- Shows processing progress to user
- Completes extraction within 30 seconds for typical 4-minute song
- Graceful handling of copyright-restricted content with clear user messaging

#### Epic 2: AI Source Separation & Transcription

**US2.1: SATB Vocal Part Separation**
_As a choir director, I want the AI to automatically separate the song into Soprano, Alto, Tenor, and Bass parts, so I can review individual vocal lines._

**Acceptance Criteria:**

- AI separates vocals into 4 distinct SATB tracks
- Each separated track is playable independently
- Confidence scores provided for each separation
- Fallback handling when fewer than 4 parts are detected
- Option to combine similar parts (e.g., Alto/Tenor if only 3 parts detected)

**US2.2: Pitch Detection & Note Transcription**
_As a music director, I want each vocal part converted to musical notation, so I can see the melody and harmony structure._

**Acceptance Criteria:**

- Accurate pitch detection with 90% target accuracy
- Notes displayed in standard musical notation
- Rhythm and timing captured appropriately for choir use
- Key signature detection and appropriate transposition
- Handles common vocal ranges and stays within SATB limits

**US2.3: Solfa Notation Generation**
_As a choir member learning by solfa method, I want do-re-mi syllables displayed under each note, so I can learn my part using the solfa system._

**Acceptance Criteria:**

- Accurate solfa syllables (do, re, mi, fa, sol, la, ti) mapped to scale degrees
- Syllables appear clearly under corresponding notes
- Handles key changes within songs appropriately
- Accounts for accidentals with appropriate solfa modifications
- Compatible with movable-do system used by most choirs

#### Epic 3: Multi-Modal Correction Interface

**US3.1: Hum Corrections**
_As a church musician with limited notation skills, I want to hum the correct melody and have the system update the transcription, so I can fix errors using my ear rather than technical knowledge._

**Acceptance Criteria:**

- Microphone access with clear permission handling
- Real-time pitch detection from user humming
- Visual feedback showing detected pitches
- One-click application of hummed corrections to notation
- Ability to hum corrections for any SATB part
- Clear start/stop recording interface

**US3.2: Visual Waveform & Notation Editor**
_As a user who wants precise control, I want to see audio waveforms alongside notation and make direct edits, so I can fine-tune timing and pitch details._

**Acceptance Criteria:**

- Side-by-side display of waveform and notation
- Click-and-drag editing for pitch adjustment
- Timeline scrubbing synchronized between audio and notation
- Zoom functionality for detailed editing
- Undo/redo capability for all edits
- Real-time audio playback of edits

**US3.3: A/B Comparison Playback**
_As a quality-focused user, I want to compare the original audio with the AI-generated version side by side, so I can verify accuracy before making corrections._

**Acceptance Criteria:**

- Side-by-side playback controls (Original | AI Generated)
- Synchronized playback starting from same timestamp
- Visual indicators showing which version is playing
- Section-by-section comparison capability
- Easy switching between versions during playback
- Volume controls for each version

**US3.4: Netflix-Style Quick Approval**
_As a user working efficiently, I want to quickly approve sections that sound correct and focus my time on sections needing work, so I can optimize my correction workflow._

**Acceptance Criteria:**

- Section-based approval interface (4-8 bar segments)
- Clear "Approve" / "Needs Work" buttons for each section
- Visual progress indicator showing approval status
- Bulk approval option for multiple sections
- Easy navigation between sections needing attention
- Auto-save of approval status

#### Epic 4: Quality Assurance & Review

**US4.1: Confidence Scoring & Error Highlighting**
_As a user focused on quality, I want to see where the AI is uncertain about its transcription, so I can prioritize my correction efforts effectively._

**Acceptance Criteria:**

- Confidence scores displayed for each measure/section
- Color-coded highlighting (green=high confidence, yellow=medium, red=low)
- Sortable list of low-confidence sections for prioritized review
- Confidence thresholds customizable by user preference
- Clear explanation of what confidence scores mean

**US4.2: Music Theory Validation**
_As a church musician, I want the system to flag potential music theory issues, so I can catch errors that might affect choir performance._

**Acceptance Criteria:**

- Voice range validation (notes outside typical SATB ranges flagged)
- Parallel fifths/octaves detection in four-part harmony
- Key signature consistency checking
- Unusual interval leaps flagged for review
- Optional music theory rule enforcement levels

#### Epic 5: PDF Generation & Export

**US5.1: Professional PDF Output**
_As a choir director, I want a print-ready PDF that matches professional sheet music standards, so I can confidently distribute it to my choir._

**Acceptance Criteria:**

- PDF format exactly matching provided sample documents
- Individual SATB part sheets plus combined score
- Lyrics positioned appropriately with solfa syllables
- Professional typography and spacing
- Print-optimized formatting (8.5x11 or A4)
- Metadata including song title, key, tempo

**US5.2: Customizable Layout Options**
_As a user with specific choir needs, I want basic layout options for the PDF output, so I can adapt the format to my team's preferences._

**Acceptance Criteria:**

- Font size options for different reading needs
- Page orientation choice (portrait/landscape)
- Option to include/exclude solfa syllables
- Measure numbering options
- Header customization (church name, date, etc.)

---

## Technical Requirements

### System Architecture

**Frontend Web Application:**

- React-based SPA for responsive user experience
- Audio playback and waveform visualization capabilities
- Real-time microphone input for humming corrections
- PDF preview and download functionality

**Backend API Services:**

- Node.js/Express API handling YouTube processing and AI orchestration
- Python microservices for audio processing and music theory logic
- Queue-based job processing for scalable audio processing
- File storage for temporary audio and generated PDFs

**AI Integration:**

- Third-party AI services for source separation (LALAL.AI, Replicate, or similar)
- Custom pitch detection and music theory mapping algorithms
- Confidence scoring and quality assessment systems

**Data Storage:**

- PostgreSQL for user sessions and correction history
- Cloud storage (AWS S3/Google Cloud) for temporary audio files
- Redis for session management and processing queue

### Performance Requirements

**Processing Speed:**

- YouTube audio extraction: <30 seconds
- AI source separation: <60 seconds for 4-minute song
- PDF generation: <10 seconds
- Total end-to-end processing: <2 minutes target

**Quality Standards:**

- 90% pitch accuracy target before human correction
- 95% rhythm accuracy target
- Support for songs 2-10 minutes in length
- Handle typical YouTube audio quality variations

**User Experience:**

- Web interface responsive on desktop and tablet
- Real-time audio playback without latency issues
- Smooth waveform visualization and editing
- Correction interface accessible to non-musicians

### Security & Privacy

**Data Handling:**

- No permanent storage of copyrighted audio content
- Automatic cleanup of temporary files after 24 hours
- User correction data stored only with explicit consent
- Clear privacy policy for audio processing

**Access Control:**

- Session-based authentication for correction workflow
- Rate limiting to prevent abuse
- Secure API endpoints for AI service integration

---

## Technical Specifications

### API Endpoints

**POST /api/transcribe/youtube**

- Input: YouTube URL
- Output: Processing job ID
- Initiates transcription pipeline

**GET /api/transcribe/status/{jobId}**

- Input: Job ID
- Output: Processing status and progress
- Polling endpoint for frontend updates

**POST /api/transcribe/correct**

- Input: Correction data (humming audio, manual edits)
- Output: Updated transcription
- Handles all correction methods

**POST /api/export/pdf**

- Input: Final transcription data, layout options
- Output: PDF download URL
- Generates final sheet music

### Data Models

**Transcription Job:**

```
{
  jobId: string,
  youtubeUrl: string,
  status: 'processing' | 'ready_for_review' | 'completed',
  audioMetadata: {
    title: string,
    duration: number,
    key: string,
    tempo: number
  },
  separatedParts: {
    soprano: AudioTrack,
    alto: AudioTrack,
    tenor: AudioTrack,
    bass: AudioTrack
  },
  transcription: {
    notation: NotationData,
    confidence: ConfidenceScores,
    corrections: UserCorrections[]
  }
}
```

**User Corrections:**

```
{
  correctionId: string,
  method: 'hum' | 'visual' | 'approval',
  section: {start: number, end: number},
  originalData: NotationData,
  correctedData: NotationData,
  timestamp: Date
}
```

---

## Implementation Strategy

### Development Phases

#### Phase 1: Core Pipeline (Weeks 1-3)

**Goal**: Establish working end-to-end flow from YouTube to PDF

**Deliverables:**

- YouTube audio extraction service
- AI source separation integration (LALAL.AI or similar)
- Basic pitch detection and MIDI conversion
- Simple PDF generation matching sample format
- Basic web interface for URL input and PDF download

**Success Criteria:**

- Can process a YouTube song and generate a recognizable PDF
- Processing completes within target time limits
- PDF format matches sample document structure

**Technical Focus:**

- Set up core infrastructure (Node.js backend, React frontend)
- Integrate with third-party AI service
- Implement basic music notation library integration
- Establish deployment pipeline

#### Phase 2: Correction Interface (Weeks 4-6)

**Goal**: Implement multi-modal correction system

**Deliverables:**

- Audio playback and waveform visualization
- A/B comparison interface
- Netflix-style section approval system
- Basic visual notation editing
- Hum correction proof of concept

**Success Criteria:**

- Users can review AI output and make corrections
- Correction workflow is intuitive for non-musicians
- All correction methods functional and integrated

**Technical Focus:**

- Audio processing and playback systems
- Real-time microphone input handling
- Interactive notation editing interface
- State management for correction workflow

#### Phase 3: Quality & Polish (Weeks 7-8)

**Goal**: Achieve 90% accuracy and production readiness

**Deliverables:**

- Confidence scoring and error highlighting
- Music theory validation
- Performance optimization
- Error handling and edge cases
- User experience refinements

**Success Criteria:**

- 90% accuracy target achieved
- Robust handling of various song types
- Professional user experience quality
- Ready for personal church use

**Technical Focus:**

- Algorithm tuning and optimization
- Comprehensive error handling
- Performance monitoring and optimization
- Security and privacy compliance

#### Phase 4: Church Beta (Weeks 9-10)

**Goal**: Validate with real church musicians

**Deliverables:**

- User accounts and session management
- Usage analytics and feedback collection
- Documentation and help system
- Stability improvements based on beta feedback

**Success Criteria:**

- 5-10 church musicians successfully using SolfaMe
- Positive feedback on output quality and usability
- Technical stability under real-world usage
- Clear path to broader launch

### Technology Stack Decisions

#### Frontend

- **React 18** with TypeScript for type safety in complex audio/notation UI
- **Tone.js** for audio playback and real-time audio processing
- **VexFlow** or **OpenSheetMusicDisplay** for music notation rendering
- **Tailwind CSS** for rapid, responsive UI development

#### Backend

- **Node.js with Express** for main API server (familiar, fast development)
- **Python Flask microservice** for music theory processing (leverages music libraries)
- **Bull Queue with Redis** for background job processing
- **PostgreSQL** for session data and user corrections

#### AI Services

- **LALAL.AI** or **Replicate Demucs** for source separation (proven, reliable)
- **Spotify Basic-Pitch** or **Crepe** for pitch detection (open source, customizable)
- **Custom algorithms** for solfa mapping and music theory validation

#### Infrastructure

- **Vercel** for frontend deployment (zero-config, fast)
- **Railway/Render** for backend services (simple, affordable)
- **AWS S3** for temporary file storage (reliable, pay-per-use)
- **Cloudflare** for CDN and basic DDoS protection

### Quality Assurance Strategy

#### Automated Testing

**Unit Tests:**

- Music theory algorithms (solfa mapping, key detection)
- Audio processing functions (pitch detection, timing)
- PDF generation consistency
- API endpoint functionality

**Integration Tests:**

- End-to-end transcription pipeline
- AI service integration reliability
- File processing and cleanup
- Error handling scenarios

**Performance Tests:**

- Processing time under various song lengths
- Concurrent user load testing
- Memory usage optimization
- File storage cleanup verification

#### Manual Testing Protocol

**Accuracy Validation:**

- Test suite of 20+ diverse songs (different genres, keys, arrangements)
- Blind accuracy testing with church musicians
- Comparison against manual transcriptions
- Edge case handling (key changes, complex rhythms)

**User Experience Testing:**

- Non-musician usability testing
- Correction workflow effectiveness
- PDF output quality assessment
- Cross-browser compatibility

#### Quality Metrics

**Technical Metrics:**

- Processing success rate >95%
- Average accuracy score >90%
- Processing time <2 minutes for 4-minute song
- Zero data breaches or privacy issues

**User Metrics:**

- User completion rate >80% (URL input to PDF download)
- Correction session duration <20 minutes
- PDF output satisfaction >90%
- User recommendation rate >70%

---

## Risk Management

### Technical Risks

**AI Service Dependency**

- **Risk**: Third-party AI service downtime or quality degradation
- **Mitigation**: Multi-provider strategy, local fallback algorithms, robust error handling
- **Contingency**: Maintain relationships with 2-3 AI service providers

**Audio Processing Complexity**

- **Risk**: Inconsistent results with different music genres or recording qualities
- **Mitigation**: Comprehensive test suite, preprocessing optimization, graceful degradation
- **Contingency**: Clear user expectations about supported content types

**Solo Developer Bandwidth**

- **Risk**: Feature scope exceeding single developer capacity
- **Mitigation**: Strict MVP focus, proven technology choices, iterative development
- **Contingency**: Community involvement for testing and feedback

### Business Risks

**Copyright and Legal Issues**

- **Risk**: Legal challenges around music transcription and fair use
- **Mitigation**: Clear terms of service, educational use focus, no permanent audio storage
- **Contingency**: Legal consultation before broader launch

**Market Adoption Challenges**

- **Risk**: Church musicians hesitant to adopt new technology
- **Mitigation**: Personal network validation, word-of-mouth strategy, free MVP access
- **Contingency**: Focus on power users and early adopters initially

### Operational Risks

**Scaling Costs**

- **Risk**: AI processing costs growing faster than user adoption
- **Mitigation**: Usage monitoring, cost-effective AI provider selection, processing optimization
- **Contingency**: Freemium model with usage limits

**Quality Control at Scale**

- **Risk**: Maintaining quality standards as usage grows
- **Mitigation**: Automated quality metrics, user feedback systems, continuous algorithm improvement
- **Contingency**: Human quality review for critical use cases

---

## Success Metrics & KPIs

### MVP Success Criteria

**Technical Performance:**

- 90% pitch accuracy on test song suite
- <2 minute average processing time
- 95% successful processing rate
- Zero critical security vulnerabilities

**User Adoption:**

- Personal church team successfully using for Sunday services
- 3+ other church musicians completing full workflow
- 80% of users completing URL→PDF workflow
- Average user session producing usable PDF output

### Growth Phase Metrics

**Product Quality:**

- 95% user satisfaction with PDF output quality
- <5% user abandonment during correction phase
- Average correction session <15 minutes
- 90% of generated PDFs used in actual choir practice

**Market Traction:**

- 50+ church musicians registered and active
- 20% month-over-month growth in usage
- 70% user recommendation rate (Net Promoter Score)
- 5+ testimonials from church music directors

### Long-term Vision Metrics

**Community Impact:**

- 500+ churches using SolfaMe regularly
- 10,000+ songs successfully transcribed
- Community-contributed correction improvements
- Integration partnerships with church management platforms

---

## Next Steps & Action Items

### Immediate Actions (This Week)

1. **Set up development environment** - Initialize React + Node.js project structure
2. **Research AI services** - Compare LALAL.AI, Replicate, and other source separation APIs
3. **Design data models** - Finalize database schema for transcription jobs and corrections
4. **Create sample UI mockups** - Basic wireframes for correction interface workflow

### Week 1-2 Priorities

1. **Implement YouTube audio extraction** - Basic yt-dlp integration and audio preprocessing
2. **Integrate source separation API** - Connect to chosen AI service and handle responses
3. **Basic PDF generation** - Simple PDF output matching sample document format
4. **Set up project infrastructure** - CI/CD pipeline, testing framework, deployment setup

### Decision Points Requiring Resolution

1. **AI Service Selection** - Final choice between LALAL.AI, Replicate Demucs, or other providers
2. **Music Notation Library** - VexFlow vs OpenSheetMusicDisplay for rendering and editing
3. **Deployment Platform** - Vercel + Railway vs other hosting combinations
4. **Pricing Strategy** - Free MVP vs freemium model planning

### Validation Checkpoints

1. **Week 3**: End-to-end pipeline working with sample song
2. **Week 6**: Correction interface usable by non-technical church musicians
3. **Week 8**: Personal church team validation with real Sunday service use
4. **Week 10**: Beta group feedback and broader launch readiness

---

## Appendices

### A. Reference Documents

- Product Brief: `docs/product-brief-SolfaMe-2025-11-20.md`
- Brainstorming Session: `docs/bmm-brainstorming-session-2025-11-20.md`
- Sample PDF Outputs: `sample-outputs/` directory

### B. Technical Research

- AI Service Comparison Matrix (to be created)
- Music Notation Library Evaluation (to be created)
- Performance Benchmarking Results (to be created)

### C. User Research

- Church Musician Interview Notes (to be collected)
- Usability Testing Results (to be documented)
- Beta User Feedback Summary (to be compiled)

---

**Document Status:** Complete - Ready for Development
**Next Review:** After Phase 1 completion
**Approval Required:** Self-approved for solo development project
