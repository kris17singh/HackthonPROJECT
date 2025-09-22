# HackthonPROJECT
Demo Prototype will only run locally on your machine

## BrightPath

Backend: Node.js + Express + lowdb. Frontend: React + Vite + TailwindCSS.

### Prerequisites
- Node.js 18+

### Backend Setup (port 5000)
1. cd backend
2. Copy env.example to .env and set values
   - PORT=5000
   - AI_API_KEY= (optional; if omitted, mock responses are used)
3. npm install
4. npm run dev

Endpoints:
- POST /auth/signup
- GET /dashboard/:id
- POST /chat/message
- GET /mentor/match/:id
- POST /resume/generate
- POST /interview/simulate

### Frontend Setup (port 5173)
1. cd frontend
2. Copy env.example to .env and set VITE_API_URL (default http://localhost:5000)
3. npm install
4. npm run dev

Pages:
- Onboarding (/)
- Dashboard (/dashboard)
- Chatbot (/chat)
- Mentor (/mentor)
- ResumeBuilder (/resume)
- MockInterview (/interview)

### Run
Start backend and frontend in separate terminals:
- Backend: npm install && npm run dev (in backend)
- Frontend: npm install && npm run dev (in frontend)



