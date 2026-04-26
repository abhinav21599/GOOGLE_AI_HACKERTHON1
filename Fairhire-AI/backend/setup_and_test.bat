@echo off
echo ============================================================
echo   Fairhire-AI Backend Setup and Test
echo ============================================================
echo.

echo [1/3] Checking Python installation...
python --version
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    pause
    exit /b 1
)
echo.

echo [2/3] Installing dependencies...
pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo.

echo [3/3] Configuring Gemini API Key
echo.
echo IMPORTANT: You need a Gemini API key to continue.
echo Get one free from: https://aistudio.google.com/app/apikey
echo.
pause

python setup_gemini.py
if errorlevel 1 (
    echo ERROR: Failed to configure API key
    pause
    exit /b 1
)
echo.

echo ============================================================
echo   Setup Complete!
echo ============================================================
echo.
echo Running API tests...
echo.

python test_api.py

echo.
echo ============================================================
echo Next Steps:
echo 1. Start backend: python server.py
echo 2. Start frontend: npm run dev (in main folder)
echo ============================================================
echo.
pause
