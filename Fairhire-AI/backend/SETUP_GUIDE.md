# 🔧 Backend Setup & Testing Guide

This guide will help you configure the Gemini API key and test all backend endpoints.

## 📋 Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- Google account (for Gemini API key)

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### Step 2: Configure Gemini API Key

**Option A: Interactive Setup (Recommended)**
```bash
python setup_gemini.py
```
This will guide you through the process and provide instructions.

**Option B: Manual Setup**
1. Get your API key from: https://aistudio.google.com/app/apikey
2. Open `.env` file in the `backend` folder
3. Replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

### Step 3: Test Everything

```bash
python test_api.py
```

This will run comprehensive tests on:
- ✅ Health check endpoint
- ✅ CSV analysis endpoint
- ✅ Error handling
- ✅ Gemini AI integration

---

## 🧪 Running the Backend Server

After configuration and testing:

```bash
python server.py
```

The server will start at: **http://localhost:8000**

API Documentation available at: **http://localhost:8000/docs**

---

## 📊 Test Results Explanation

### ✅ All Tests Pass
```
🎉 All tests passed! Your API is working correctly.
```
**Next:** Start the backend and frontend servers.

### ⚠️ Some Tests Fail

**Common Issues:**

1. **Backend not running**
   ```
   ❌ Health check - Backend server is not running!
   ```
   **Fix:** Run `python server.py` in another terminal

2. **Gemini API not configured**
   ```
   ❌ Gemini API Key - API key not configured
   ```
   **Fix:** Run `python setup_gemini.py`

3. **Missing dependencies**
   ```
   ❌ ModuleNotFoundError
   ```
   **Fix:** Run `pip install -r requirements.txt`

---

## 🔍 API Endpoints

### 1. Health Check
- **Endpoint:** `GET /`
- **Purpose:** Verify server is running
- **Response:** Status message

### 2. Analyze CSV
- **Endpoint:** `POST /analyze`
- **Purpose:** Upload CSV and get bias analysis
- **Input:** CSV file with columns:
  - Name, Gender, College, CGPA, Skills, Experience, Achievements, Selected
- **Response:** 
  - Bias detection results
  - Gender & College bias analysis
  - CGPA vs Skills insight
  - AI-powered explanation

---

## 📝 Sample CSV Format

```csv
Name,Gender,College,CGPA,Skills,Experience,Achievements,Selected
John Doe,Male,Tier 1,9.2,High,3,Yes,Yes
Jane Smith,Female,Tier 2,8.5,High,2,Yes,Yes
```

**Required Columns:**
- `Name` - Candidate name
- `Gender` - Gender identity
- `College` - College tier (Tier 1, Tier 2, Tier 3, etc.)
- `CGPA` - Cumulative GPA (0-10 scale)
- `Skills` - Skill level (High, Medium, Low)
- `Experience` - Years of experience
- `Achievements` - Yes/No
- `Selected` - Yes/No (hiring decision)

---

## 🔑 Getting Gemini API Key

1. **Visit:** https://aistudio.google.com/app/apikey
2. **Sign in** with your Google account
3. **Click** "Create API Key"
4. **Copy** the generated key
5. **Paste** it when running `python setup_gemini.py`

**Note:** Gemini API is free to use with generous limits.

---

## 🐛 Troubleshooting

### Issue: "Unable to generate AI explanation"
**Cause:** Invalid or missing Gemini API key
**Fix:** 
```bash
python setup_gemini.py
```

### Issue: "Error processing file"
**Cause:** CSV format incorrect or missing columns
**Fix:** Verify CSV has all required columns

### Issue: "Module not found"
**Cause:** Dependencies not installed
**Fix:**
```bash
pip install -r requirements.txt
```

### Issue: CORS errors from frontend
**Cause:** Backend not running or wrong URL
**Fix:** 
1. Ensure backend is running on port 8000
2. Check `.env.local` in frontend has: `NEXT_PUBLIC_API_URL=http://localhost:8000`

---

## 📦 Files Created

1. **`setup_gemini.py`** - Interactive API key configuration
2. **`test_api.py`** - Comprehensive API test suite
3. **`requirements.txt`** - Updated with testing dependencies

---

## ✅ Verification Checklist

- [ ] Python dependencies installed
- [ ] Gemini API key configured
- [ ] Backend server starts without errors
- [ ] Health check endpoint responds
- [ ] CSV analysis returns results
- [ ] AI explanation is generated
- [ ] Frontend can connect to backend

---

## 🎯 Next Steps After Setup

1. **Start Backend:**
   ```bash
   python server.py
   ```

2. **Start Frontend (in another terminal):**
   ```bash
   cd ..
   npm run dev
   ```

3. **Access Application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

4. **Test Full Flow:**
   - Navigate to Upload page
   - Upload a CSV file
   - View analysis on Dashboard

---

## 📞 Need Help?

If you encounter any issues:
1. Check the test output for specific error messages
2. Verify all prerequisites are met
3. Ensure both backend and frontend are running
4. Check console logs for detailed error information

---

**Happy Testing! 🚀**
