#!/bin/bash

echo "========================================"
echo "  FairHire AI - Quick Start Script"
echo "========================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python3 is not installed or not in PATH"
    echo "Please install Python 3.9+ from https://www.python.org/"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed or not in PATH"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "[1/4] Setting up Python backend..."
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment and install dependencies
echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing Python dependencies..."
pip install -r requirements.txt

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo ""
    echo "WARNING: .env file not found!"
    echo "Please create backend/.env with your GEMINI_API_KEY"
    echo "Get your API key from: https://aistudio.google.com/app/apikey"
    echo ""
    read -p "Press Enter to continue..."
fi

cd ..

echo ""
echo "[2/4] Setting up Node.js frontend..."
# Install frontend dependencies
if [ ! -d "node_modules" ]; then
    echo "Installing Node.js dependencies..."
    npm install
else
    echo "Node modules already installed."
fi

echo ""
echo "[3/4] Starting Backend Server..."
echo "Backend will run on: http://localhost:8000"
echo "API Docs: http://localhost:8000/docs"
cd backend
source venv/bin/activate
uvicorn server:app --reload --port 8000 &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

echo ""
echo "[4/4] Starting Frontend Server..."
echo "Frontend will run on: http://localhost:3000"
npm run dev &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo "  Setup Complete!"
echo "========================================"
echo ""
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:3000"
echo "API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for user to press Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT TERM
wait
