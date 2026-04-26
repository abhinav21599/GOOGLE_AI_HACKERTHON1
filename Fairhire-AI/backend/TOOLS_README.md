# 🔧 Backend Setup & Testing Tools

This directory contains automated scripts to configure and test the Fairhire-AI backend.

## 📁 Files Overview

| File | Purpose |
|------|---------|
| `setup_gemini.py` | Interactive Gemini API key configuration |
| `test_api.py` | Comprehensive API endpoint testing |
| `setup_and_test.bat` | Windows one-click setup script |
| `SETUP_GUIDE.md` | Detailed setup documentation |

## 🚀 Quick Start

### Option 1: Automated Setup (Windows)
Simply double-click `setup_and_test.bat` and follow the prompts.

### Option 2: Manual Setup

**Step 1: Install Dependencies**
```bash
pip install -r requirements.txt
```

**Step 2: Configure Gemini API Key**
```bash
python setup_gemini.py
```

**Step 3: Test API Endpoints**
```bash
python test_api.py
```

**Step 4: Start Backend Server**
```bash
python server.py
```

## 🧪 What Gets Tested

The test suite (`test_api.py`) validates:

1. **Health Check Endpoint** - Verifies server is running
2. **CSV Analysis Endpoint** - Tests file upload and bias detection
3. **Error Handling** - Validates rejection of invalid files
4. **Gemini AI Integration** - Confirms AI explanation generation

## 📊 Test Output Examples

### ✅ Success
```
🎉 All tests passed! Your API is working correctly.

Next steps:
1. Start the backend server: python server.py
2. Start the frontend: npm run dev
3. Navigate to: http://localhost:3000
```

### ⚠️ Needs Configuration
```
❌ FAIL - Gemini API Key
   API key not configured
   Run: python setup_gemini.py to configure
```

## 🔑 Getting Your Gemini API Key

1. Visit: https://aistudio.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key
5. Run `python setup_gemini.py` and paste it

**Cost:** FREE (generous limits for development)

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Backend not running" | Run `python server.py` in another terminal |
| "Module not found" | Run `pip install -r requirements.txt` |
| "API key not configured" | Run `python setup_gemini.py` |
| "Connection refused" | Ensure backend is running on port 8000 |

## 📝 Additional Resources

- **Detailed Guide:** See `SETUP_GUIDE.md`
- **API Documentation:** http://localhost:8000/docs (after starting server)
- **Main README:** See project root `README.md`

## ✅ Verification Checklist

After setup, verify:
- [ ] All dependencies installed
- [ ] Gemini API key configured
- [ ] All tests pass
- [ ] Backend starts without errors
- [ ] Frontend can connect to backend

---

**Need Help?** Check `SETUP_GUIDE.md` for detailed troubleshooting.
