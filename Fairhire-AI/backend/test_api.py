"""
Comprehensive API Test Script for Fairhire-AI Backend
Tests all endpoints and validates responses
"""
import requests
import json
import time
import os
from pathlib import Path

BASE_URL = "http://localhost:8000"

def print_section(title):
    print("\n" + "=" * 60)
    print(f"  {title}")
    print("=" * 60)

def print_result(test_name, success, message=""):
    status = "✅ PASS" if success else "❌ FAIL"
    print(f"{status} - {test_name}")
    if message:
        print(f"   {message}")

def create_test_csv():
    """Create a sample CSV file for testing"""
    csv_content = """Name,Gender,College,CGPA,Skills,Experience,Achievements,Selected
John Doe,Male,Tier 1,9.2,High,3,Yes,Yes
Jane Smith,Female,Tier 1,8.8,High,2,Yes,Yes
Bob Johnson,Male,Tier 2,7.5,Medium,1,No,Yes
Alice Williams,Female,Tier 2,8.1,High,2,Yes,Yes
Charlie Brown,Male,Tier 3,6.8,Low,0,No,No
Diana Prince,Female,Tier 1,9.0,High,3,Yes,Yes
Eve Davis,Male,Tier 2,7.2,Medium,1,No,No
Frank Miller,Male,Tier 3,6.5,Low,0,No,No
Grace Lee,Female,Tier 1,8.5,High,2,Yes,Yes
Henry Wilson,Male,Tier 2,7.8,Medium,1,Yes,Yes
Ivy Chen,Female,Tier 1,9.1,High,3,Yes,Yes
Jack Taylor,Male,Tier 3,6.9,Low,0,No,No
Kate Anderson,Female,Tier 2,8.0,High,2,Yes,Yes
Liam Thomas,Male,Tier 1,8.7,High,2,Yes,Yes
Mia Jackson,Female,Tier 3,7.0,Medium,1,No,Yes
Noah White,Male,Tier 2,7.6,Medium,1,No,No
Olivia Harris,Female,Tier 1,9.3,High,3,Yes,Yes
Paul Martin,Male,Tier 3,6.7,Low,0,No,No
Quinn Garcia,Female,Tier 2,8.2,High,2,Yes,Yes
Ryan Martinez,Male,Tier 1,8.9,High,3,Yes,Yes"""
    
    test_file = Path(__file__).parent / "test_sample.csv"
    with open(test_file, 'w') as f:
        f.write(csv_content)
    
    return test_file

def test_health_check():
    """Test GET / endpoint"""
    print_section("TEST 1: Health Check Endpoint")
    
    try:
        response = requests.get(f"{BASE_URL}/", timeout=5)
        
        success = response.status_code == 200
        print_result("Health check", success, f"Status: {response.status_code}")
        
        if success:
            data = response.json()
            print(f"   Response: {data}")
            return True
        else:
            print(f"   Error: Status code {response.status_code}")
            return False
            
    except requests.exceptions.ConnectionError:
        print_result("Health check", False, "Backend server is not running!")
        print("   Start server with: python server.py")
        return False
    except Exception as e:
        print_result("Health check", False, str(e))
        return False

def test_analyze_csv():
    """Test POST /analyze endpoint"""
    print_section("TEST 2: CSV Analysis Endpoint")
    
    test_file = create_test_csv()
    
    try:
        print(f"📄 Using test file: {test_file}")
        print(f"📊 Test data: 20 candidates with various attributes")
        
        with open(test_file, 'rb') as f:
            files = {'file': ('test_sample.csv', f, 'text/csv')}
            response = requests.post(f"{BASE_URL}/analyze", files=files, timeout=60)
        
        success = response.status_code == 200
        print_result("CSV analysis", success, f"Status: {response.status_code}")
        
        if success:
            data = response.json()
            
            # Validate response structure
            required_fields = ['status', 'filename', 'analysis', 'ai_explanation']
            missing_fields = [field for field in required_fields if field not in data]
            
            if missing_fields:
                print_result("Response structure", False, f"Missing fields: {missing_fields}")
                return False
            else:
                print_result("Response structure", True, "All required fields present")
            
            # Print analysis results
            analysis = data['analysis']
            print(f"\n📈 Analysis Results:")
            print(f"   Bias Detected: {'Yes' if analysis['bias_detected'] else 'No'}")
            
            # Gender bias
            if 'Gender' in analysis['results']:
                gender = analysis['results']['Gender']
                print(f"\n   Gender Bias:")
                print(f"   - Rates: {gender['rates']}")
                print(f"   - Bias Detected: {'Yes' if gender['bias_detected'] else 'No'}")
                print(f"   - Difference: {gender['difference']}")
            
            # College bias
            if 'College' in analysis['results']:
                college = analysis['results']['College']
                print(f"\n   College Bias:")
                print(f"   - Rates: {college['rates']}")
                print(f"   - Bias Detected: {'Yes' if college['bias_detected'] else 'No'}")
                print(f"   - Difference: {college['difference']}")
            
            # CGPA insight
            if 'cgpa_insight' in analysis:
                cgpa = analysis['cgpa_insight']
                print(f"\n   CGPA vs Skills:")
                print(f"   - CGPA Selection Rate: {cgpa['cgpa_selection_rate']}")
                print(f"   - Skill Selection Rate: {cgpa['skill_selection_rate']}")
                print(f"   - Insight: {cgpa['insight']}")
            
            # AI Explanation
            print(f"\n🤖 AI Explanation:")
            ai_exp = data['ai_explanation']
            if "Unable to generate" in ai_exp:
                print_result("AI Explanation", False, ai_exp)
                print("   ⚠️  Check your Gemini API key in .env file")
            else:
                print_result("AI Explanation", True, f"Length: {len(ai_exp)} characters")
                print(f"   Preview: {ai_exp[:200]}...")
            
            # Clean up test file
            test_file.unlink()
            
            return True
        else:
            error_data = response.json()
            print_result("CSV analysis", False, f"Error: {error_data.get('detail', 'Unknown error')}")
            return False
            
    except FileNotFoundError:
        print_result("CSV analysis", False, "Test file not created")
        return False
    except requests.exceptions.Timeout:
        print_result("CSV analysis", False, "Request timed out (60s)")
        return False
    except Exception as e:
        print_result("CSV analysis", False, str(e))
        return False

def test_invalid_file():
    """Test error handling with invalid file"""
    print_section("TEST 3: Error Handling - Invalid File Type")
    
    try:
        # Create a non-CSV file
        test_file = Path(__file__).parent / "test_invalid.txt"
        with open(test_file, 'w') as f:
            f.write("This is not a CSV file")
        
        with open(test_file, 'rb') as f:
            files = {'file': ('test_invalid.txt', f, 'text/plain')}
            response = requests.post(f"{BASE_URL}/analyze", files=files, timeout=10)
        
        # Should return 400 error
        success = response.status_code == 400
        print_result("Rejects non-CSV files", success, f"Status: {response.status_code}")
        
        # Clean up
        test_file.unlink()
        
        return success
        
    except Exception as e:
        print_result("Error handling test", False, str(e))
        return False

def test_gemini_configuration():
    """Test if Gemini API is properly configured"""
    print_section("TEST 4: Gemini API Configuration")
    
    try:
        # Import the server module to check configuration
        import sys
        sys.path.insert(0, str(Path(__file__).parent))
        
        # Load environment variables
        from dotenv import load_dotenv
        load_dotenv()
        
        api_key = os.getenv('GEMINI_API_KEY')
        
        if not api_key or api_key == "YOUR_GEMINI_API_KEY_HERE":
            print_result("Gemini API Key", False, "API key not configured")
            print("   Run: python setup_gemini.py to configure")
            return False
        else:
            print_result("Gemini API Key", True, f"Key found (length: {len(api_key)})")
            
            # Test actual Gemini connection
            import google.generativeai as genai
            genai.configure(api_key=api_key)
            
            try:
                model = genai.GenerativeModel('gemini-2.0-flash')
                response = model.generate_content("Say 'API connected' in one sentence")
                
                if response.text:
                    print_result("Gemini API Connection", True, "Successfully connected to Gemini")
                    print(f"   Response: {response.text[:100]}")
                    return True
                else:
                    print_result("Gemini API Connection", False, "No response from Gemini")
                    return False
                    
            except Exception as e:
                print_result("Gemini API Connection", False, str(e))
                return False
        
    except ImportError:
        print_result("Gemini API Test", False, "python-dotenv not installed")
        print("   Install with: pip install python-dotenv")
        return False
    except Exception as e:
        print_result("Gemini API Test", False, str(e))
        return False

def print_summary(results):
    """Print test summary"""
    print_section("TEST SUMMARY")
    
    total = len(results)
    passed = sum(1 for r in results if r)
    failed = total - passed
    
    print(f"\nTotal Tests: {total}")
    print(f"✅ Passed: {passed}")
    print(f"❌ Failed: {failed}")
    print(f"Success Rate: {(passed/total*100):.1f}%")
    
    if failed == 0:
        print("\n🎉 All tests passed! Your API is working correctly.")
        print("\nNext steps:")
        print("1. Start the backend server: python server.py")
        print("2. Start the frontend: npm run dev")
        print("3. Navigate to: http://localhost:3000")
    else:
        print("\n⚠️  Some tests failed. Please review the errors above.")
        print("\nCommon fixes:")
        print("- Backend not running: python server.py")
        print("- Gemini API not configured: python setup_gemini.py")
        print("- Missing dependencies: pip install -r requirements.txt")
    
    print()

def main():
    print("\n🚀 Fairhire-AI Backend API Test Suite")
    print("Starting comprehensive API tests...\n")
    
    results = []
    
    # Run tests
    results.append(test_health_check())
    results.append(test_analyze_csv())
    results.append(test_invalid_file())
    results.append(test_gemini_configuration())
    
    # Print summary
    print_summary(results)

if __name__ == "__main__":
    main()
