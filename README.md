
# 🚀 FairHire AI - Intelligent Hiring Bias Auditor

An AI-powered full-stack application that detects bias in hiring decisions using intelligent data analysis.  
Built with **Next.js (frontend)** and **FastAPI (backend)** with integration of **Google Gemini AI**.



## 🌐 Live Demo

🚀 Try it now:

- Frontend: https://google-ai-hackerthon.vercel.app  
- Backend API: https://google-ai-hackerthon.onrender.com  
- API Docs: https://google-ai-hackerthon.onrender.com/docs  

⚠️ Note: Backend is hosted on Render's free tier and may take 30–50 seconds to wake up after inactivity.



## 🧠 Problem Statement

Traditional hiring processes often rely heavily on metrics like CGPA or are influenced by unconscious bias.  
This leads to unfair decisions and overlooks candidates with strong skills, experience, and achievements.



## 💡 Solution

**FairHire AI** provides a holistic and unbiased evaluation system by:

- Analyzing multiple candidate attributes  
- Detecting bias patterns across groups  
- Providing AI-generated insights for fair decision-making  



## 🚀 Features

- 📊 CSV Upload & Analysis  
- ⚖️ Multi-Attribute Bias Detection (Gender, College Tier, CGPA vs Skills)  
- 🧠 AI-Powered Explanations using Gemini  
- 📈 Interactive Dashboard with visual insights  
- ⚡ Real-time processing with FastAPI  
- 🎨 Modern UI with glassmorphism design  

## 📁 Project Structure

```bash
Fairhire-AI/
├── app/
│   ├── (app)/
│   │   ├── dashboard/
│   │   ├── upload/
│   │   ├── insights/
│   │   ├── reports/
│   │   └── settings/
│   ├── signin/
│   ├── signup/
│   └── page.tsx
│
├── backend/
│   ├── server.py
│   ├── main_logic.py
│   ├── bias.py
│   ├── parser.py
│   └── requirements.txt
│
├── components/
├── lib/
│   ├── api.ts
│   └── analysis-context.tsx
│
├── public/
├── styles/
├── package.json
├── next.config.js
└── README.md
```


## 🛠️ Tech Stack

### Frontend
- Next.js (React)
- Tailwind CSS
- Framer Motion
- Recharts

### Backend
- FastAPI
- Python

### AI
- Google Gemini API

### Data Processing
- Pandas / CSV module

### Deployment
- Vercel (Frontend)
- Render (Backend)



## ⚙️ How It Works

1. Upload candidate dataset (CSV)
2. Backend parses the data
3. Calculates selection rates
4. Detects bias using statistical comparison
5. Compares CGPA vs Skills impact
6. Generates AI-based explanation
7. Displays results on dashboard



## 📊 CSV Format

Required columns:
Name, Gender, College, CGPA, Skills, Experience, Achievements, Selected



Example:
John Doe,Male,Tier1,9.5,High,High,High,Yes
Jane Smith,Female,Tier2,8.0,Medium,Medium,Medium,No


## 🔧 API Endpoints

### GET /
Health check endpoint

### POST /analyze

- Upload CSV file  
- Returns bias analysis and insights  


## ⚡ Local Setup

### 1. Clone Repository
```bash
git clone https://github.com/your-username/your-repo.git
cd Fairhire-AI
````

---

### 2. Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn server:app --reload
```

---

### 3. Frontend Setup

```bash
npm install
npm run dev
```

---

## 🔐 Environment Variables

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (.env)

```
GEMINI_API_KEY=your_api_key_here
```

---

## 🧪 Testing

Use Swagger UI:

[http://localhost:8000/docs](http://localhost:8000/docs)

Or test with curl:

```bash
curl -X POST http://localhost:8000/analyze \
  -F "file=@backend/sample.csv"
```



## 🎯 Impact

* Promotes fair hiring practices
* Reduces unconscious bias
* Encourages data-driven decisions
* Helps identify truly capable candidates



## 🧪 Note

This is a **working prototype** developed during the hackathon
**“Build with AI – Solution Challenge by Google”**



## 👥 Team

* Abhinav Kumar (Team Lead)
* Abhishek
* Prajwal Gowda
* Shrihari D.G



## 📈 Future Enhancements

* Authentication system
* PDF report export
* Historical analytics
* Custom bias thresholds
* Multi-format support



## 🤝 Contributions

Contributions are welcome! Feel free to fork and raise a PR.



## ⭐ Support

If you found this project useful, give it a ⭐ on GitHub!



## 📬 Contact

For collaboration or feedback:

* LinkedIn: www.linkedin.com/in/abhinav-kumar-969ab5367


Built with ❤️ for fair and unbiased hiring



