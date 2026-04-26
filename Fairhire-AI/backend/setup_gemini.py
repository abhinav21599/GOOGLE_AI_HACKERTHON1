"""
Interactive setup script for configuring Gemini API Key
Run this script to easily set up your Gemini API key
"""
import os
from pathlib import Path

def setup_gemini_api_key():
    print("=" * 60)
    print("🔑 Fairhire-AI: Gemini API Key Configuration")
    print("=" * 60)
    print()
    
    # Check if .env file exists
    env_path = Path(__file__).parent / ".env"
    
    if not env_path.exists():
        print("❌ .env file not found!")
        print("Creating new .env file...")
    else:
        print("✅ .env file found")
    
    print()
    print("📋 Instructions to get your Gemini API Key:")
    print("1. Visit: https://aistudio.google.com/app/apikey")
    print("2. Sign in with your Google account")
    print("3. Click 'Create API Key'")
    print("4. Copy the generated API key")
    print()
    
    # Get API key from user
    api_key = input("🔐 Paste your Gemini API Key here: ").strip()
    
    if not api_key:
        print("❌ No API key provided. Setup cancelled.")
        return
    
    # Validate API key format (basic check)
    if len(api_key) < 20:
        print("⚠️  Warning: API key seems too short. Please verify it's correct.")
        confirm = input("Continue anyway? (y/n): ").strip().lower()
        if confirm != 'y':
            print("Setup cancelled.")
            return
    
    # Write to .env file
    env_content = f"""# Backend Environment Variables
GEMINI_API_KEY={api_key}

# Get your API key from: https://aistudio.google.com/app/apikey
"""
    
    try:
        with open(env_path, 'w') as f:
            f.write(env_content)
        
        print()
        print("=" * 60)
        print("✅ SUCCESS! Gemini API Key configured successfully!")
        print("=" * 60)
        print()
        print(f"📁 API key saved to: {env_path}")
        print()
        print("🧪 Next steps:")
        print("1. Run the test script: python test_api.py")
        print("2. Start the backend: python server.py")
        print("3. Start the frontend: npm run dev")
        print()
        
    except Exception as e:
        print(f"❌ Error saving API key: {str(e)}")
        return

if __name__ == "__main__":
    setup_gemini_api_key()
