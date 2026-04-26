# FairHire AI - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
│                     (http://localhost:3000)                      │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP Requests
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                   NEXT.JS FRONTEND (Port 3000)                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Pages & Components                                       │  │
│  │  ├─ Landing Page (page.tsx)                              │  │
│  │  ├─ Upload Page (app/upload/page.tsx)                    │  │
│  │  ├─ Dashboard (app/dashboard/page.tsx)                   │  │
│  │  └─ Other Pages (insights, reports, settings)            │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  State Management                                         │  │
│  │  └─ AnalysisContext (lib/analysis-context.tsx)           │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  API Client                                               │  │
│  │  └─ api.ts (lib/api.ts)                                  │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ Fetch API (POST /analyze)
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                  FASTAPI BACKEND (Port 8000)                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  API Endpoints                                            │  │
│  │  ├─ GET  /          (Health check)                       │  │
│  │  └─ POST /analyze   (CSV analysis)                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Business Logic                                           │  │
│  │  ├─ server.py         (FastAPI server & CORS)            │  │
│  │  ├─ main_logic.py     (Analysis orchestration)           │  │
│  │  ├─ bias.py           (Bias detection algorithms)        │  │
│  │  └─ parser.py         (CSV parsing)                      │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  AI Integration                                           │  │
│  │  └─ Google Gemini Pro API                                │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

### Upload & Analysis Flow

```
1. USER ACTION
   └─> Uploads CSV file on Upload Page

2. FRONTEND PROCESSING
   └─> Creates FormData with file
   └─> Calls uploadAndAnalyze() from lib/api.ts
   └─> Sends POST request to backend

3. BACKEND PROCESSING
   └─> server.py receives file
   └─> Saves to temporary file
   └─> Calls analyze_data() from main_logic.py
   
4. DATA PARSING
   └─> parser.py reads CSV
   └─> Returns array of candidate records

5. BIAS ANALYSIS
   └─> analyze_attribute() for Gender
   └─> analyze_attribute() for College
   └─> detect_cgpa_bias() for CGPA vs Skills
   
6. BIAS DETECTION
   └─> calculate_selection_rate() for each group
   └─> detect_bias() using 80% rule (20% threshold)
   └─> Returns bias metrics

7. AI EXPLANATION
   └─> main_logic.py compiles results
   └─> server.py calls get_gemini_explanation()
   └─> Gemini Pro generates insights
   └─> Returns detailed explanation

8. RESPONSE TO FRONTEND
   └─> JSON response with:
       ├─ analysis results
       ├─ bias metrics
       └─ AI explanation

9. FRONTEND UPDATE
   └─> Stores result in AnalysisContext
   └─> Shows completion message
   └─> User navigates to Dashboard

10. DASHBOARD DISPLAY
    └─> Calculates fairness score
    └─> Displays bias metrics
    └─> Shows AI explanation
    └─> Provides suggestions
```

## Component Architecture

### Frontend Components

```
App Layout
├─ AnalysisProvider (Global State)
├─ Toaster (Notifications)
└─ Pages
   ├─ Landing Page (Public)
   │  ├─ Navbar
   │  ├─ HeroSection
   │  ├─ FeaturesSection
   │  ├─ HowItWorksSection
   │  ├─ TrustSection
   │  └─ Footer
   │
   ├─ Upload Page (Protected)
   │  ├─ FileUpload Component
   │  ├─ DragDrop Zone
   │  └─ Progress Indicator
   │
   └─ Dashboard Page (Protected)
      ├─ FairnessRing (SVG Animation)
      ├─ MetricsCards
      ├─ BiasCharts
      ├─ FeatureInsight
      ├─ AIExplanation
      └─ Suggestions
```

### Backend Modules

```
server.py (Entry Point)
├─ FastAPI App Configuration
├─ CORS Middleware
├─ Gemini AI Configuration
├─ GET / (Health Check)
└─ POST /analyze (Main Endpoint)
   └─> main_logic.py
      ├─ parse_csv() from parser.py
      ├─ analyze_attribute() for Gender
      │  └─> bias.py
      │     ├─ calculate_selection_rate()
      │     └─ detect_bias()
      ├─ analyze_attribute() for College
      │  └─> bias.py
      ├─ detect_cgpa_bias()
      └─ Compile results
   └─> get_gemini_explanation()
      └─ Gemini API Call
```

## Technology Stack Layers

```
┌─────────────────────────────────────────────────┐
│              PRESENTATION LAYER                  │
│  React Components | Tailwind CSS | Animations   │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│              APPLICATION LAYER                   │
│  Next.js Router | Context API | API Client      │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│              INTEGRATION LAYER                   │
│  REST API | HTTP | FormData | JSON              │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│              BUSINESS LOGIC LAYER                │
│  FastAPI | Bias Algorithms | Data Processing    │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│              AI/ML LAYER                         │
│  Google Gemini Pro | Natural Language Gen       │
└─────────────────────────────────────────────────┘
```

## File Structure

```
Fairhire-AI/
│
├── app/                          # Next.js App Router
│   ├── (app)/                    # Protected Routes
│   │   ├── dashboard/            # Bias Analysis Dashboard
│   │   ├── insights/             # Insights Page
│   │   ├── reports/              # Reports Page
│   │   ├── settings/             # Settings Page
│   │   └── upload/               # CSV Upload
│   ├── signin/                   # Authentication
│   ├── signup/                   # Authentication
│   ├── layout.tsx                # Root Layout
│   └── page.tsx                  # Landing Page
│
├── backend/                      # FastAPI Backend
│   ├── server.py                 # Main Server
│   ├── main_logic.py             # Analysis Logic
│   ├── bias.py                   # Bias Detection
│   ├── parser.py                 # CSV Parser
│   ├── requirements.txt          # Python Dependencies
│   ├── sample.csv                # Test Data
│   └── .env                      # Backend Config
│
├── components/                   # React Components
│   ├── app/                      # App Shell
│   ├── dashboard/                # Dashboard Widgets
│   ├── landing/                  # Landing Page Sections
│   ├── shared/                   # Shared Components
│   └── ui/                       # UI Primitives (shadcn)
│
├── lib/                          # Utilities
│   ├── api.ts                    # API Client
│   ├── analysis-context.tsx      # State Management
│   └── utils.ts                  # Helper Functions
│
├── public/                       # Static Assets
├── styles/                       # Global Styles
├── hooks/                        # Custom Hooks
│
├── .env.local                    # Frontend Config
├── start.bat                     # Windows Startup
├── start.sh                      # Mac/Linux Startup
├── README.md                     # Documentation
├── QUICKSTART.md                 # Quick Guide
└── package.json                  # Node Dependencies
```

## API Endpoints

### Backend API (http://localhost:8000)

| Method | Endpoint | Description | Request | Response |
|--------|----------|-------------|---------|----------|
| GET | `/` | Health check | None | Status message |
| POST | `/analyze` | Analyze CSV | FormData (file) | Analysis results + AI explanation |

### Response Structure

```json
{
  "status": "success",
  "filename": "data.csv",
  "analysis": {
    "bias_detected": true,
    "results": {
      "Gender": {
        "attribute": "Gender",
        "rates": { "Male": 0.8, "Female": 0.4 },
        "bias_detected": true,
        "difference": 0.4
      },
      "College": {
        "attribute": "College",
        "rates": { "Tier1": 0.75, "Tier2": 0.5 },
        "bias_detected": true,
        "difference": 0.25
      }
    },
    "cgpa_insight": {
      "cgpa_selection_rate": 0.85,
      "skill_selection_rate": 0.65,
      "insight": "Model is over-prioritizing CGPA over skills."
    }
  },
  "ai_explanation": "Detailed AI-generated insights..."
}
```

## Security Considerations

- ✅ CORS configured for frontend domain
- ✅ File type validation (CSV only)
- ✅ Temporary file cleanup
- ✅ Environment variables for secrets
- ✅ No hardcoded API keys in code

## Performance Optimizations

- ✅ FastAPI async endpoints
- ✅ Efficient CSV parsing
- ✅ Minimal data transfer
- ✅ React component lazy loading (potential)
- ✅ Optimized animations with Framer Motion

## Development Workflow

```
Developer
   ↓
1. Modify Frontend Code
   ↓
2. Hot Reload (Next.js)
   ↓
3. Test in Browser
   ↓
4. Modify Backend Code
   ↓
5. Auto Reload (Uvicorn)
   ↓
6. Test API with Swagger UI
   ↓
7. Integration Test
   ↓
8. Commit & Deploy
```

---

**Built for the Google AI Hackathon 2026** 🚀
