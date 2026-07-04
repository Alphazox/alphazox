# ALPHAZOX IT Solutions Website

A professional, fully responsive corporate website for **ALPHAZOX** — a global digital transformation partner. Built with **React 18 + TypeScript** (Vite) on the frontend and **Node.js + Express** on the backend.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite 8 |
| Styling | Vanilla CSS (Dark Glassmorphic Design) |
| Backend | Node.js, Express 4 |
| File Uploads | Multer |
| Fonts | Inter + Outfit (Google Fonts) |

---

## 📁 Project Structure

```
alphazox-website/
├── server/
│   └── server.js          # Express backend server
├── src/
│   ├── components/
│   │   ├── Navbar.tsx/css  # Responsive sticky navigation
│   │   ├── Hero.tsx/css    # Animated hero section
│   │   ├── Services.tsx/css # Interactive service catalog
│   │   ├── Industries.tsx/css # Industries served grid
│   │   ├── Careers.tsx/css  # Job listings + CV upload form
│   │   ├── Contact.tsx/css  # Contact form + offices
│   │   ├── ChatBot.tsx/css  # Floating AI chat assistant
│   │   └── Footer.tsx/css   # Site footer
│   ├── App.tsx             # Root app component
│   ├── index.css           # Global design system
│   └── main.tsx            # React entry point
├── dist/                   # Production build output
├── index.html              # SEO-optimized HTML shell
├── vite.config.ts          # Vite + proxy config
├── package.json
├── start-dev.bat           # 🟢 One-click development startup
└── start-prod.bat          # 🔵 One-click production startup
```

---

## ▶️ Running the Website

### Requirements
- **Node.js 22+** is bundled at `C:\Users\prasa\.gemini\antigravity\scratch\node22`
- No global install needed — the startup scripts set the PATH automatically.

### Development Mode (Hot Reload)
Double-click **`start-dev.bat`** or run:
```powershell
$env:PATH = "C:\Users\prasa\.gemini\antigravity\scratch\node22;" + $env:PATH
# Terminal 1 — Backend
node server/server.js

# Terminal 2 — Frontend
npm run dev
```
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

### Production Mode (Single Server)
Double-click **`start-prod.bat`** or run:
```powershell
$env:PATH = "C:\Users\prasa\.gemini\antigravity\scratch\node22;" + $env:PATH
npm run build
node server/server.js
```
- **Full Site**: http://localhost:5000 *(Express serves the built frontend + API)*

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/contact` | Submit contact form |
| `POST` | `/api/careers` | Submit CV/job application (multipart) |
| `POST` | `/api/chatbot` | Chat with AI assistant (Astia) |

### Example – Chatbot
```bash
POST /api/chatbot
{"message": "Tell me about your GCC services"}
```

---

## 📦 Deployment

The site is deployment-ready for any Node.js hosting (Render, Railway, Fly.io, VPS):

1. Set `NODE_PATH` to Node.js 22+
2. Run `npm install && npm run build`
3. Run `node server/server.js`
4. Set `PORT` environment variable if needed (default: `5000`)

For **cloud deployment**, set environment variable:
```
PORT=8080
```

---

## ✅ Build Status
- **TypeScript**: 0 errors
- **Vite Build**: ✅ 32 modules, 231 KB JS, 27 KB CSS
- **Backend API**: ✅ All 3 endpoints tested and responding
