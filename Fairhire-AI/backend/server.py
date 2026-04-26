import os
import tempfile
import json
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from main_logic import analyze_data
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Bias Detection API",
    description="API for analyzing bias in selection data with AI-powered explanations",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Gemini AI
# Set your Gemini API key here or use environment variable
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "YOUR_GEMINI_API_KEY_HERE")
genai.configure(api_key=GEMINI_API_KEY)

def get_gemini_explanation(analysis_result: dict) -> str:
    """Get AI-powered explanation from Gemini about the bias analysis results"""
    try:
        model = genai.GenerativeModel('gemini-2.0-flash')
        
        prompt = f"""
        Analyze the following bias detection results and provide a clear, actionable explanation:
        
        {json.dumps(analysis_result, indent=2)}
        
        Please provide:
        1. A summary of the bias detected (if any)
        2. Which attributes show the most bias
        3. The severity of the bias
        4. Recommendations to address the bias
        5. Insights about CGPA vs Skills prioritization
        
        Keep the explanation concise, professional, and easy to understand for HR/recruitment teams.
        """
        
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Unable to generate AI explanation: {str(e)}"


@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "Bias Detection API is running",
        "docs": "/docs",
        "swagger": "/docs"
    }


@app.post("/analyze")
async def analyze_csv(file: UploadFile = File(..., description="CSV file containing selection data")):
    """
    Analyze CSV file for bias detection with AI-powered explanation
    
    - **file**: CSV file with columns: Name, Gender, College, CGPA, Skills, Experience, Achievements, Selected
    """
    # Validate file type
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Only CSV files are allowed")
    
    # Save uploaded file temporarily
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix='.csv', mode='w', encoding='utf-8') as temp_file:
            content = await file.read()
            temp_file.write(content.decode('utf-8'))
            temp_file_path = temp_file.name
        
        # Run bias analysis
        analysis_result = analyze_data(temp_file_path)
        
        # Get Gemini AI explanation
        ai_explanation = get_gemini_explanation(analysis_result)
        
        # Combine results
        final_result = {
            "status": "success",
            "filename": file.filename,
            "analysis": analysis_result,
            "ai_explanation": ai_explanation
        }
        
        return final_result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")
    finally:
        # Clean up temporary file
        if 'temp_file_path' in locals():
            try:
                os.remove(temp_file_path)
            except:
                pass


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
