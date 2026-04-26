"""Quick script to check available Gemini models"""
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv('GEMINI_API_KEY')
genai.configure(api_key=api_key)

print("Fetching available models...\n")

try:
    models = genai.list_models()
    print("✅ Available Gemini Models:\n")
    
    generative_models = []
    for model in models:
        if 'generateContent' in model.supported_generation_methods:
            print(f"✓ {model.name}")
            generative_models.append(model.name)
    
    print(f"\nTotal generative models: {len(generative_models)}")
    
    if generative_models:
        print(f"\nRecommended model to use: {generative_models[0]}")
        
except Exception as e:
    print(f"❌ Error: {e}")
