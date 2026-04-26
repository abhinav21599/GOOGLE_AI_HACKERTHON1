# Quick Start Guide - FairHire AI

## 🚀 Get Started in 3 Steps

### Step 1: Configure Gemini API Key

1. Get your free API key from: https://aistudio.google.com/app/apikey
2. Open `backend/.env`
3. Replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

### Step 2: Start the Application

**Option A: Using the startup script (Windows)**
```bash
# Double-click start.bat or run in terminal
.\start.bat
```

**Option B: Manual start**

Terminal 1 - Backend:
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn server:app --reload --port 8000
```

Terminal 2 - Frontend:
```bash
npm install
npm run dev
```

### Step 3: Test with Sample Data

1. Open http://localhost:3000 in your browser
2. Click "Get Started" or navigate to Upload
3. Upload the sample CSV file from `backend/sample.csv`
4. Wait for analysis to complete
5. View your dashboard with real bias analysis results!

## 📊 Sample CSV Format

```csv
Name,Gender,College,CGPA,Skills,Experience,Achievements,Selected
A,Male,Tier1,9.5,Low,Low,Low,Yes
B,Female,Tier3,8.0,High,High,High,No
C,Male,Tier1,9.2,Low,Medium,Low,Yes
D,Female,Tier2,7.5,High,High,Medium,No
E,Male,Tier1,9.8,Low,Low,Low,Yes
F,Female,Tier3,8.2,High,Medium,High,No
```

## 🧪 Test API Directly

Using curl:
```bash
curl -X POST http://localhost:8000/analyze \
  -F "file=@backend/sample.csv"
```

Using browser:
- Open http://localhost:8000/docs
- Click on `/analyze` endpoint
- Click "Try it out"
- Upload `backend/sample.csv`
- Click "Execute"

## ✅ Verify Everything Works

**Backend Health Check:**
- Visit: http://localhost:8000
- Expected: `{"message": "Bias Detection API is running", ...}`

**API Documentation:**
- Visit: http://localhost:8000/docs
- Expected: Interactive Swagger UI

**Frontend:**
- Visit: http://localhost:3000
- Expected: Beautiful landing page

## 🎯 What You'll See

After uploading a CSV:
1. **Fairness Score**: 0-100 score based on bias detection
2. **Bias Metrics**: Gender bias, College tier bias
3. **CGPA vs Skills**: Analysis of prioritization
4. **AI Explanation**: Detailed insights from Gemini AI
5. **Suggestions**: Actionable recommendations

## ❓ Common Issues

**"Backend not responding"**
- Make sure backend is running on port 8000
- Check if `.env` file has valid GEMINI_API_KEY

**"CORS error"**
- Backend should have CORS enabled (already configured)
- Ensure frontend uses `http://localhost:3000`

**"Module not found" in backend**
- Run: `pip install -r requirements.txt`
- Ensure virtual environment is activated

**"Cannot find module" in frontend**
- Run: `npm install`
- Delete `node_modules` and reinstall if needed

## 🎉 You're Ready!

Your FairHire AI is now fully operational. Start uploading your hiring data and get AI-powered bias insights!
