# Mumbai Police Tactical Intelligence Platform — Next.js Frontend

A modern Next.js 14 (App Router, TypeScript, Tailwind CSS, Lucide Icons) frontend for Vercel deployment, connected to the Python FastAPI backend (`api_server.py`).

---

## 🚀 How to Run Locally

### 1. Start the Python FastAPI Backend (Terminal 1)
```bash
# In the root workspace directory:
python api_server.py
# Or: uvicorn app_backend.main:app --port 8080 --reload
```
The backend API server will run at `http://localhost:8080`.
Interactive Swagger API documentation is available at `http://localhost:8080/docs`.

### 2. Start the Next.js Frontend (Terminal 2)
```bash
# Navigate to the frontend directory:
cd frontend

# Install dependencies (first time only):
npm install

# Run dev server:
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 🌐 Deploying to Vercel (Step-by-Step Instructions)

### Option A: Deploy via Vercel Dashboard (Recommended)
1. Push your repository to **GitHub**.
2. Log in to [Vercel](https://vercel.com) and click **"Add New" > "Project"**.
3. Select your repository and choose `frontend` as the **Root Directory**.
4. In the **Environment Variables** section, add:
   - `NEXT_PUBLIC_API_URL` = `https://your-python-backend.up.railway.app` (or your backend URL on Render/Railway/Vercel Serverless).
5. Click **Deploy**. Vercel will automatically build and publish your Next.js application!

### Option B: Deploy via Vercel CLI
```bash
# Install Vercel CLI if needed:
npm i -g vercel

# Navigate to frontend folder and run:
cd frontend
vercel
```
Follow the interactive prompts in the terminal to deploy!
