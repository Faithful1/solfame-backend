# Product Brief: SolfaMe

**Date:** 2025-11-20
**Author:** FAIYATech
**Context:** AI-powered music transcription tool for choir education

---

## Executive Summary

SolfaMe democratizes music transcription for church teams and choirs by using AI to automatically convert any YouTube song into professional-quality SATB arrangements with solfa notation. Built by a church keyboardist who experienced firsthand the pressure of being expected to transcribe songs without proper training, SolfaMe eliminates the transcription bottleneck that limits many church teams' musical repertoire.

The MVP focuses on single-song processing with speed and quality as primary goals: users input a YouTube link and receive print-ready PDF arrangements in seconds, not hours. The platform features a sophisticated multi-modal correction interface allowing users to perfect transcriptions through humming, visual editing, and A/B comparisons - ensuring 90% accuracy without requiring musical expertise.

**Vision:** Empower every church team to confidently learn any song, regardless of their transcription skills, expanding musical horizons across the church community.

---

## Core Vision

### Problem Statement

Choirs and worship teams depend on musically skilled individuals (often keyboardists or music directors) to manually transcribe songs and break them down into individual vocal parts with solfa notation. This creates a bottleneck where:

- Keyboardists/musicians are expected to have transcription skills they may not possess
- Manual transcription is time-consuming and requires significant musical expertise
- Choirs can't access songs without someone who can do the complex work of separation and notation
- The person doing transcription becomes a single point of failure for choir preparation
- Many church teams have musical enthusiasm but lack anyone with trained transcription "ears"
- Teams get stuck unable to learn new songs despite having willing singers

### Proposed Solution

SolfaMe democratizes music transcription by using AI to automatically break down any song into individual vocal parts with solfa notation, eliminating the need for specialized transcription skills. Church teams, choirs, and worship groups can simply input a YouTube link and receive professional-quality SATB arrangements with do-re-mi notation, empowering any team to learn new music regardless of their transcription expertise.

---

## Target Users

### Primary Users

**Church Keyboardists & Musicians** - The go-to people expected to transcribe songs but who may lack specialized transcription skills. They need a reliable tool to quickly turn any song into choir-ready materials without requiring advanced musical training.

**Choir Directors & Worship Leaders** - Leaders who want to expand their repertoire but are limited by transcription bottlenecks. They need professional-quality arrangements they can confidently distribute to their teams.

**Church Teams Without Musical Experts** - Enthusiastic worship teams and choirs that lack anyone with trained transcription "ears" but still want to learn new songs and arrangements.

---

## Success Vision

### Personal Success Metrics

- **Confidence Boost**: Ability to confidently say "yes" when team asks about learning new songs
- **Stress Reduction**: Elimination of time pressure and anxiety around transcription requests
- **Quality Assurance**: Choir successfully using SolfaMe-generated materials for worship services

### Community Impact Goals

- **Expanded Repertoire**: Churches trying new music previously limited by transcription bottlenecks
- **Empowered Musicians**: Keyboardists and music directors feeling confident in their roles regardless of transcription skills
- **Democratic Access**: Any church team able to learn any song, regardless of musical training background

### Business Objectives

- **Market Validation**: Church musicians actively using and recommending SolfaMe
- **Quality Standard**: 90%+ user satisfaction with generated PDF outputs
- **Community Growth**: Word-of-mouth adoption through church musician networks

---

## MVP Scope

### Core Features

**MVP Core Features:**

- **YouTube Link Input** - Simple URL input for any song source
- **AI-Powered Source Separation** - Automatic separation into SATB vocal parts
- **Solfa Notation Generation** - Do-re-mi syllables mapped under each note
- **Multi-Modal Correction Interface** - Human-in-the-loop editing with multiple correction methods:
  - Hum corrections for pitch fixes
  - Visual waveform + notation editor for precision
  - A/B comparison for quality verification
  - Quick approval workflow for mostly-correct sections
- **Professional PDF Output** - Choir-ready sheet music matching sample output format:
  - Individual SATB parts
  - Combined score
  - Lyrics with solfa syllables
  - Print-ready formatting
- **Quality-First Workflow** - 90% accuracy target with comprehensive review tools

### Key Differentiators

- **Church-Specific Focus**: Built by and for church musicians who understand the real-world constraints and requirements
- **Solfa Notation Expertise**: Specialized in do-re-mi educational notation that choirs actually use for learning
- **Quality Over Speed**: Designed for precision and reliability rather than quick-but-imperfect results
- **Human-in-the-Loop Philosophy**: AI handles heavy lifting while preserving human musical judgment and correction
- **Practical Output Format**: PDF format optimized for printing, sharing, and real choir use cases

### Technical Preferences & Constraints

**MVP Approach:**

- **Single Song Focus**: Perfect one-song workflow before building batch processing capabilities
- **Speed Optimization**: Target processing in seconds rather than minutes for maximum user satisfaction
- **Quality Over Features**: 90% accuracy more important than additional features for MVP

**Performance Targets:**

- **Processing Speed**: As fast as possible (seconds preferred over minutes)
- **User Tolerance**: Church musicians expect quick turnaround for Sunday preparation
- **Iterative Development**: Start simple, add complexity in future versions

**Development Philosophy:**

- **Prove the Concept**: Validate core transcription → PDF workflow with real church use cases
- **User Feedback Driven**: Build for actual church musician workflows and constraints
- **Future Scalability**: Design MVP foundation that can grow to batch processing and advanced features

**Solo Development Constraints:**

- **Developer**: Building independently - architecture must be manageable for single developer
- **Quality + Speed Focus**: Both processing speed AND transcription accuracy are critical success factors
- **Pragmatic Technology Choices**: Prefer proven, reliable solutions over cutting-edge complexity
- **MVP-First Mindset**: Ship working solution quickly, iterate based on real church musician feedback

**Recommended Technical Approach for Solo Developer:**

- **Web Application**: Easier deployment, updates, and user access than desktop app
- **Cloud Processing**: Leverage managed AI services rather than building/maintaining ML infrastructure
- **Proven AI Models**: Use established source separation APIs (LALAL.AI, Spleeter-based services) for reliability
- **Simple but Effective**: Focus on core pipeline excellence rather than complex features

### Next Steps

1. **Validate MVP Scope** - Test core pipeline with own church team
2. **Select AI Service Provider** - Evaluate LALAL.AI, Replicate, or similar for source separation
3. **Build Correction Interface** - Focus on multi-modal editing experience as key differentiator
4. **Perfect PDF Output** - Match sample document format exactly
5. **Church Beta Testing** - Deploy with friendly church musicians for real-world validation
6. **Community Launch** - Share through church musician networks for organic growth

---
