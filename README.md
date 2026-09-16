# Brihanmumbai Police — AI-Powered Criminal Network & Tactical Intelligence System (SIH 26)

Unified Police Tactical Intelligence Command Center combining FastAPI (Python REST API Backend) and Next.js (React Frontend).

---

## 🚀 How to Run Locally (For Evaluators)

### Step 1 — Start the FastAPI Backend (Terminal 1)

```bash
# Install Python dependencies
pip install -r requirements.txt

# Start the FastAPI server (port 8002)
python -m uvicorn app_backend.main:app --host 127.0.0.1 --port 8002 --reload
```
- **Backend API**: `http://localhost:8002`
- **Interactive Swagger Docs**: `http://localhost:8002/docs`
- **Cryptographic Audit Verification**: `http://localhost:8002/api/audit/verify`

### Step 2 — Start the Next.js Frontend (Terminal 2)

```bash
cd frontend
npm install
npm run dev
```
- **Web Command Center**: `http://localhost:3000`

---

## ☁️ Production Deployment

### Architecture
- **Frontend** → [Vercel](https://vercel.com) (Next.js, auto-deployed from GitHub)
- **Backend** → [Render](https://render.com) (FastAPI, full Python runtime, free tier)

### Backend on Render
1. Go to [render.com](https://render.com) → New → Web Service
2. Connect your GitHub repo
3. **Build Command:** `pip install -r requirements.txt`
4. **Start Command:** `python -m uvicorn app_backend.main:app --host 0.0.0.0 --port $PORT`
5. **Env Var:** `PYTHONPATH` = `.`
6. Deploy → copy the URL (e.g., `https://police-intel-api.onrender.com`)

### Frontend on Vercel
1. Go to [vercel.com](https://vercel.com) → New Project → connect GitHub repo
2. Set **Root Directory** to `frontend`
3. Add **Environment Variable:** `NEXT_PUBLIC_API_URL` = `https://police-intel-api.onrender.com`
4. Deploy → Done ✅

---

## 🐳 Docker (Optional — Edge Command Van / Air-Gapped Deployment)

```bash
docker-compose up --build -d
docker-compose logs -f
docker-compose down
```

---

## 🔒 Security & Cryptographic Audit Features

1. **SHA-256 Tamper-Evident Audit Logging** — Every API access is recorded with a SHA-256 hash chain. Verifiable via `GET /api/audit/verify`.
2. **Non-Root Docker Container** — Runs as unprivileged `appuser` (UID 1000).
3. **CORS Allowlist** — Only `localhost:3000` and `*.vercel.app` origins accepted; configurable via `FRONTEND_URL` env var.
4. **Secrets Hygiene** — All credentials loaded from `.env` via `python-dotenv`. `.env` and `*.db` files are git-ignored.

---

## 📌 Project Architecture

- **Frontend (`/frontend`)**: Next.js 16 (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons, ReactFlow (network graphs).
- **Backend (`/app_backend`)**: FastAPI REST APIs — 18 modular routers covering CDR, CCTV, Crime Rings, Gangs, Financial/PMLA, Nocturnal Analysis, Field Surveillance, Dossiers, Social Media, NLP, Graph Analytics, AI Copilot, Streaming, and SHA-256 Audit.
- **Intelligence Engines**: IntelligenceEngine (6-factor threat scoring), PMLAFinancialGraphEngine (1,142-line money laundering graph), MLThreatScorer (Random Forest hybrid), NetworkAnalyzer (PageRank + Betweenness), NLP Engine (IPC/BNS + Mumbai MO taxonomy), StatisticalAnomalyEngine (Z-score + Haversine).
