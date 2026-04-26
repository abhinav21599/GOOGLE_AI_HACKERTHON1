@echo off
echo ========================================
echo   FairHire AI - Quick Start Script
echo ========================================
echo.

:: Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.9+ from https://www.python.org/
    pause
    exit /b 1
)

:: Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/4] Setting up Python backend...
cd backend

:: Create virtual environment if it doesn't exist
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

:: Activate virtual environment and install dependencies
echo Activating virtual environment...
call venv\Scripts\activate

echo Installing Python dependencies...
pip install -r requirements.txt

:: Check if .env file exists
if not exist ".env" (
    echo.
    echo WARNING: .env file not found!
    echo Please create backend\.env with your GEMINI_API_KEY
    echo Get your API key from: https://aistudio.google.com/app/apikey
    echo.
    pause
)

cd ..

echo.
echo [2/4] Setting up Node.js frontend...
:: Install frontend dependencies
if not exist "node_modules" (
    echo Installing Node.js dependencies...
    call npm install
) else (
    echo Node modules already installed.
)

echo.
echo [3/4] Starting Backend Server...
echo Backend will run on: http://localhost:8000
echo API Docs: http://localhost:8000/docs
start "FairHire Backend" cmd /k "cd backend && venv\Scripts\activate && uvicorn server:app --reload --port 8000"

:: Wait for backend to start
timeout /t 3 /nobreak >nul

echo.
echo [4/4] Starting Frontend Server...
echo Frontend will run on: http://localhost:3000
start "FairHire Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo API Docs: http://localhost:8000/docs
echo.
echo Two terminal windows have been opened.
echo Please wait for both servers to start.
echo.
pause
