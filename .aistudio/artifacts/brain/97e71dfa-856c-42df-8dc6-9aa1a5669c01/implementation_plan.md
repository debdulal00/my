# Debdulal Sahoo - Elite AI/ML Developer & AI Product Builder Portfolio

A production-grade, high-performance portfolio website presenting Debdulal Sahoo as an AI/ML developer, Generative AI builder, and digital product entrepreneur, engineered with Apple- and Linear-inspired aesthetics, interactive project deep-dives, full-stack contact messaging with a private admin inbox, and an interactive resume viewer.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and UX choices have been confirmed through Phase 1 requirements analysis:

- **Contact Form & Message Storage (Confirmed)**: Full-stack backend API (`/api/contact`) with SQLite/JSON local persistence, rate-limiting spam protection, and a private authenticated admin inbox (`/admin` or secret toggle modal) allowing Debdulal to review, search, toggle read/unread status, and delete inquiries without exposing private communications to public visitors.
- **Resume System (Confirmed)**: ATS-compliant digital resume view + embedded interactive PDF viewer modal with instant download (`Debdulal_Sahoo_Resume.pdf`) and an in-browser local replacement upload tool so the owner can swap or preview updated CV PDFs dynamically.
- **Visual Identity & Design System (Confirmed)**: Pure dark mode default (`#08090D` canvas, `#141722` structural cards, `#4F8CFF` electric blue & `#9B72F2` violet accents, `#262B38` hairline borders) with a seamless light mode toggle obeying Tailwind v4 `@custom-variant dark`. Zero generic AI slop: no pill badge sandwiches, no `//` code comments in headers, no fake cockpit telemetry.

---

## 1. Overview & Core Concept

- **What It Does**: Provides an immersive, high-credibility digital presence for Debdulal Sahoo (CSE AI & ML undergraduate at Brainware University, CGPA 8.6/10, graduating August 2027), highlighting his five flagship ventures and applications: **ToolsVerse AI**, **SivInd AI**, **AI Travel Planner**, **SkinVision AI**, and **IndoNest**.
- **Target Audience / Persona**: International recruiters, technical hiring managers, AI/ML engineering leads, startup founders, remote tech employers, and potential enterprise clients.
- **Key Value**: Bridges academic computer science rigour with demonstrable, independent entrepreneurial execution in Generative AI, LLM multi-agent orchestration, and web-scale digital platforms.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Hero & First Impression**: Visually compelling hero with an interactive abstract neural network particle background, punchy headline, verified credentials (B.Tech CSE AI & ML, Brainware University, India, Open for remote opportunities), quick links to live projects, resume modal, and contact form.
2. **Flagship Projects Showcase**: Bento-grid and structured project cards for the 5 projects with domain badges, tech tags, live website launch buttons, architectural highlights, and deep-dive modal walk-throughs.
3. **Interactive Skills Matrix**: Organized into 5 distinct categories (Programming Languages, Machine Learning & Data Science, Generative AI & Agent Development, Development & Databases, and Computer Science Fundamentals) with interactive category filters and stack context.
4. **Interactive ATS Resume Modal**: Built-in PDF reader simulation with download, copyable text, section-by-section credentials, and a local PDF file replacement tester.
5. **Full-Stack Inquiries & Admin Inbox**: Visitors submit inquiries through a responsive, validated contact form. An admin modal (authenticated via secure passphrase) lets Debdulal manage all incoming leads with real-time status updates and search filtering.

### Visual Identity & Theme
- **Aesthetic Direction**: Minimal, architectural, high-contrast dark interface inspired by Apple, Linear, and Vercel.
- **Color Palette & Mood**:
  - Canvas: `#08090D` (Dark) / `#F8FAFC` (Light)
  - Surface Containers: `#10131B` & `#141722` (Dark) / `#FFFFFF` & `#F1F5F9` (Light)
  - Hairline Borders: `#262B38` (Dark) / `#E2E8F0` (Light)
  - Accent Primary: `#4F8CFF` (Electric Azure)
  - Accent Secondary: `#9B72F2` (Soft Violet)
  - Text Primary: `#FFFFFF` (Dark) / `#0F172A` (Light)
  - Text Secondary: `#A1A6B3` (Dark) / `#64748B` (Light)
- **Typography & Scale**:
  - Headings: `Plus Jakarta Sans` / `Outfit` geometric display type with tight tracking and balanced wraps (`text-wrap: balance`).
  - Body: `Plus Jakarta Sans` / `DM Sans` at 15–16px, 1.6 line height.
  - Telemetry & Code: `JetBrains Mono` / tabular numerals (`tabular-nums`) for CGPA, dates, and metric data.
- **Spatial Math & Top Bar Contract**:
  - 3-zone sticky navigation: Wordmark `DS.` — 6 single-line links (`whitespace-nowrap`) — Theme Switcher & `Let's Talk` CTA.
  - Zero pill enclosures for static metadata (clean unboxed text with `·` separators).

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Full-Stack Express Server Integration**:
  - *Chosen Approach*: Utilize Express server mounted in development via Vite middleware and in production via `server.ts`, handling `/api/contact` submissions, rate-limiting, and password-authenticated `/api/admin/*` endpoints.
  - *Why*: Eliminates broken client-only form submissions, provides persistent lead capture, and meets the user's explicit requirement for real message storage and an administrative inbox.
  - *Alternative Considered*: Client-only `mailto:` links (passed over because the user explicitly demanded a functional backend inbox).

- **Decision 2: Centralized Configuration System (`src/data/portfolioData.ts`)**:
  - *Chosen Approach*: All personal details, educational timeline, project specifications, links, and contact placeholders are stored in a typed, single-source-of-truth configuration file.
  - *Why*: Enables Debdulal to update phone, email, project URLs, and grades in seconds without modifying layout markup.

- **Decision 3: Zero-Broken-Image High Fidelity Assets**:
  - *Chosen Approach*: Utilize the `generate_image` tool to create sharp, modern preview mockups for ToolsVerse AI, SivInd AI, AI Travel Planner, SkinVision AI, IndoNest, and a professional AI engineer avatar, backed by resilient CSS/SVG fallbacks.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        DEBDULAL SAHOO PORTFOLIO                        │
├────────────────────────────────────────────────────────────────────────┤
│  Top Bar: [DS. Wordmark] ── [Nav Links] ── [Theme Toggle | Let's Talk] │
├────────────────────────────────────────────────────────────────────────┤
│  Hero Section (Interactive Neural Canvas + Bio + Credential Badges)    │
│  About Me (Brainware Univ · CGPA 8.6 · 2027 Grad · West Bengal, India) │
│  Technical Skills Dashboard (5 Categories · Interactive Filter Tabs)   │
│  Featured Projects Showcase (ToolsVerse AI · SivInd AI · AI Planner...) │
│  Real-World Building Experience (Product Mindset & Startup Journey)    │
│  Vertical Education Timeline (B.Tech · HS · Secondary)                 │
│  Professional Experience (Independent AI Product Development)         │
│  Resume Section (Interactive Modal + PDF Download + Upload Preview)    │
│  Contact Section (Full-Stack Form) + [Private Admin Inbox Modal]       │
│  Footer (Copyright · Dynamic Year · Social Links · Back to Top)        │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      EXPRESS BACKEND API LAYER                         │
├────────────────────────────────────────────────────────────────────────┤
│  POST /api/contact           -> Rate-limited message capture & store   │
│  POST /api/admin/login       -> Passphrase validation & JWT/session    │
│  GET  /api/admin/messages    -> Authenticated inbox retrieval          │
│  PATCH /api/admin/messages/:id -> Mark as read / unread                │
│  DELETE /api/admin/messages/:id -> Remove message                       │
│  Data Store: Local JSON / SQLite storage (`data/messages.json`)        │
└────────────────────────────────────────────────────────────────────────┘
```

### Component & State Mapping
- `App.tsx`: Root shell managing theme (`dark` / `light`), active section spy, mobile drawer state, resume modal visibility, and admin inbox modal visibility.
- `src/components/Navbar.tsx`: Sticky 3-zone top bar with smooth scroll anchors and responsive drawer.
- `src/components/HeroSection.tsx`: Interactive HTML5 Canvas neural network with mouse gravity, headline typography, and action buttons.
- `src/components/ProjectsSection.tsx`: 5 featured project cards with live links, tech stacks, role disclosures, and modal previews.
- `src/components/SkillsSection.tsx`: Category selector tabs with structured technical proficiencies.
- `src/components/ResumeModal.tsx`: Complete ATS resume previewer with PDF download and client-side file replacement testing.
- `src/components/ContactSection.tsx`: Form validation, error/success banners, and discreet admin access key trigger.
- `src/components/AdminInboxModal.tsx`: Password-protected dashboard with search, unread badge counter, message reader, and delete handlers.
