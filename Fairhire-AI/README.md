# FairHire AI - Intelligent Hiring Bias Auditor

A full-stack application that detects bias in hiring decisions using AI-powered analysis. Built with Next.js (frontend) and FastAPI (backend) with Google's Gemini AI integration.

## 🚀 Features

- **CSV Upload & Analysis**: Upload hiring data and get instant bias analysis
- **Multi-Attribute Bias Detection**: Analyzes bias across Gender, College Tier, and CGPA vs Skills
- **AI-Powered Explanations**: Get detailed insights using Google's Gemini AI
- **Interactive Dashboard**: Visual representation of fairness scores and bias metrics
- **Real-time Processing**: Fast API responses with progress tracking
- **Beautiful UI**: Modern glassmorphism design with smooth animations

## 📁 Project Structure

```
Fairhire-AI/
├── app/                    # Next.js frontend
│   ├── (app)/             # Protected routes
│   │   ├── dashboard/     # Bias analysis dashboard
│   │   ├── upload/        # CSV upload page
│   │   ├── insights/      # Insights page
│   │   ├── reports/       # Reports page
│   │   └── settings/      # Settings page
│   ├── signin/            # Sign in page
│   ├── signup/            # Sign up page
│   └── page.tsx           # Landing page
├── backend/               # FastAPI backend
│   ├── server.py          # Main FastAPI server
│   ├── main_logic.py      # Analysis logic
│   ├── bias.py            # Bias detection algorithms
│   ├── parser.py          # CSV parser
│   └── requirements.txt   # Python dependencies
├── components/            # React components
├── lib/                   # Utilities and API services
│   ├── api.ts             # API client
│   └── analysis-context.tsx  # State management
└── public/                # Static assets
```

## 🛠️ Prerequisites

- **Node.js** 18+ and npm/pnpm
- **Python** 3.9+
- **Gemini API Key** (Get from https://aistudio.google.com/app/apikey)

## 📦 Installation

### 1. Clone the Repository

```bash
cd Fairhire-AI
```

### 2. Setup Frontend

```bash
# Install dependencies
npm install
# or
pnpm install

# Create environment file (already created)
# .env.local contains: NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (Windows)
python -m venv venv
venv\Scripts\activate

# For Mac/Linux
# python3 -m venv venv
# source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Configure Gemini API Key
# Edit .env file and add your API key:
# GEMINI_API_KEY=your_actual_api_key_here
```

## 🚀 Running the Application

### Option 1: Run Both Separately (Recommended for Development)

**Terminal 1 - Start Backend:**
```bash
cd backend
venv\Scripts\activate  # On Windows
# source venv/bin/activate  # On Mac/Linux
uvicorn server:app --reload --port 8000
```

**Terminal 2 - Start Frontend:**
```bash
npm run dev
# or
pnpm dev
```

### Option 2: Using npm scripts (if configured)

```bash
# Start both frontend and backend concurrently
npm run dev:all
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs (Swagger UI)

## 📊 CSV Data Format

Your CSV file should have the following columns:

```csv
Name,Gender,College,CGPA,Skills,Experience,Achievements,Selected
John Doe,Male,Tier1,9.5,High,High,High,Yes
Jane Smith,Female,Tier2,8.0,Medium,Medium,Medium,No
```

**Required Columns:**
- `Name`: Candidate name
- `Gender`: Male/Female/Other
- `College`: College tier (Tier1, Tier2, Tier3, etc.)
- `CGPA`: Cumulative GPA (0-10 scale)
- `Skills`: Skill level (High, Medium, Low)
- `Experience`: Experience level (High, Medium, Low)
- `Achievements`: Achievement level (High, Medium, Low)
- `Selected`: Selection decision (Yes/No)

## 🔧 API Endpoints

### `GET /`
Health check endpoint

**Response:**
```json
{
  "message": "Bias Detection API is running",
  "docs": "/docs",
  "swagger": "/docs"
}
```

### `POST /analyze`
Analyze CSV file for bias detection

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: `file` (CSV file)

**Response:**
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
        "rates": { "Tier1": 0.75, "Tier2": 0.5, "Tier3": 0.3 },
        "bias_detected": true,
        "difference": 0.45
      }
    },
    "cgpa_insight": {
      "cgpa_selection_rate": 0.85,
      "skill_selection_rate": 0.65,
      "insight": "Model is over-prioritizing CGPA over skills."
    }
  },
  "ai_explanation": "Detailed AI-generated explanation..."
}
```

## 🎯 How It Works

1. **Upload CSV**: User uploads hiring data in CSV format
2. **Parse Data**: Backend parses the CSV file
3. **Calculate Selection Rates**: Computes selection rates for each attribute group
4. **Detect Bias**: Compares selection rates using the 80% rule (20% threshold)
5. **CGPA vs Skills Analysis**: Analyzes if CGPA is over-prioritized
6. **AI Explanation**: Gemini AI generates detailed insights and recommendations
7. **Display Results**: Frontend shows interactive dashboard with visualizations

## 🔐 Environment Variables

### Frontend (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (`backend/.env`)
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

## 🧪 Testing

### Test with Sample Data

A sample CSV file is provided in `backend/sample.csv`:

```bash
# You can test the API directly using curl
curl -X POST http://localhost:8000/analyze \
  -F "file=@backend/sample.csv"
```

Or use the Swagger UI at http://localhost:8000/docs

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (React 19)
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Charts**: Recharts
- **State Management**: React Context
- **TypeScript**: Full type safety

### Backend
- **Framework**: FastAPI
- **AI**: Google Gemini Pro
- **Server**: Uvicorn
- **Data Processing**: Python CSV module

## 📈 Future Enhancements

- [ ] User authentication and data persistence
- [ ] Export reports as PDF
- [ ] Historical trend analysis
- [ ] Custom bias thresholds
- [ ] Support for more data formats (Excel, JSON)
- [ ] Advanced visualizations
- [ ] Multi-language support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Troubleshooting

### Backend won't start
- Ensure Python 3.9+ is installed
- Check if virtual environment is activated
- Verify all dependencies are installed: `pip install -r requirements.txt`
- Make sure port 8000 is not in use

### Frontend can't connect to backend
- Verify backend is running on port 8000
- Check `.env.local` has correct API URL
- Check browser console for CORS errors

### Gemini API errors
- Ensure `GEMINI_API_KEY` is set in `backend/.env`
- Verify API key is valid (get from https://aistudio.google.com/app/apikey)
- Check API quota and billing status

### CSV upload fails
- Ensure CSV has correct column headers
- Check file encoding (should be UTF-8)
- Verify file size is under 50MB

## 📞 Support

For issues and questions, please create an issue in the repository.

---

**Built with ❤️ for fair and unbiased hiring practices**
