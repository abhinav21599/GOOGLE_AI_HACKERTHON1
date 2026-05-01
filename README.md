# 🚀 FairHire AI

An AI-powered hiring intelligence platform that ensures fair, transparent, and data-driven candidate selection.



## 🧠 Problem Statement

Traditional hiring processes often rely heavily on limited metrics like CGPA and are influenced by unconscious biases related to gender, college tier, or background. This leads to unfair selection and overlooks truly capable candidates.



## 💡 Solution

**FairHire AI** solves this by analyzing candidates holistically and detecting bias patterns in hiring decisions.

It evaluates multiple parameters such as:
- Academic performance  
- Skills  
- Achievements  
- Real-world experience  

The system then identifies hidden biases and provides clear, actionable insights to support fair and merit-based hiring.



## 🔍 Key Features

- 📊 Multi-dimensional candidate analysis  
- ⚖️ Bias detection across different attributes  
- 📈 Identification of imbalanced selection patterns  
- 🧠 AI-generated insights using Gemini  
- 🌐 Full-stack working web application  



## 🛠️ Tech Stack

### Frontend
- Next.js  
- Tailwind CSS  

### Backend
- FastAPI (Python)  

### AI Integration
- Google Gemini API  

### Data Processing
- Pandas  

### Deployment
- Frontend: Vercel  
- Backend: Render  



## ⚙️ System Architecture



User (Frontend - Next.js)
↓
API Request (/analyze)
↓
Backend (FastAPI)
↓
Data Processing (Pandas)
↓
AI Analysis (Gemini API)
↓
Response (Insights + Bias Detection)
↓
Frontend Display





## 🚀 Live Demo

🌐 https://google-ai-hackerthon.vercel.app  



## 🧪 Note

This is a **working prototype** developed during the hackathon  
**“Build with AI – Solution Challenge by Google”**.



## 📂 Project Structure



Fairhire-AI/
│
├── backend/
│   ├── server.py
│   ├── main_logic.py
│   ├── requirements.txt
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── public/
│   ├── styles/
│
└── README.md





## ⚡ Getting Started (Local Setup)

### 1. Clone the repository
bash
git clone https://github.com/your-username/your-repo.git
cd Fairhire-AI




### 2. Backend Setup

bash
cd backend
pip install -r requirements.txt
uvicorn server:app --reload




### 3. Frontend Setup

bash
cd frontend
npm install
npm run dev




### 4. Environment Variables

Create `.env` file:


GEMINI_API_KEY=your_api_key_here
NEXT_PUBLIC_API_URL=http://localhost:8000




## 📊 How It Works

1. Upload candidate dataset (CSV)
2. System processes data using Pandas
3. AI analyzes patterns and detects bias
4. Results are displayed with insights

---

## 🎯 Impact

* Promotes fair and inclusive hiring
* Reduces unconscious bias
* Encourages data-driven decisions
* Helps identify truly capable candidates

---

## 👥 Team

* Abhinav Kumar
* Abhishek
* Prajwal
* Shrihari

---

## 🤝 Contributions

Contributions are welcome! Feel free to fork, improve, and raise PRs.

---

## 📬 Contact

For feedback or collaboration:

* LinkedIn: [Your LinkedIn Profile]

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!

```

---

# 🔥 This README will:

- Impress recruiters  
- Show full project clarity  
- Make your repo look **professional-level**  

---

If you want next:
- ⭐ Add badges (stars, deploy status)
- 🎯 Make README visually stunning (with images)

Just tell 👍
```
