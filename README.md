# Saktheesh Kanagaraj — Developer Portfolio

**Stack:** React + Vite | Three.js + R3F | GSAP | Framer Motion | Tailwind CSS | Node.js + Express | MongoDB

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Gmail account with App Password for Nodemailer

### Frontend (Client)
```bash
cd client
npm install --legacy-peer-deps
npm run dev
# → http://localhost:5173
```

### Backend (Server)
```bash
cd server
# Copy env template and fill in values
cp .env.example .env
npm install
node index.js
# → http://localhost:5000
```

---

## ⚙️ Environment Variables

Create `server/.env` based on `server/.env.example`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxx.mongodb.net/portfolio
EMAIL_USER=saktheeshkanagaraj149@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_TO=saktheeshkanagaraj149@gmail.com
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

> **Gmail App Password:** Google Account → Security → 2-Step Verification → App Passwords → Generate

---

## 📁 Structure

```
portfolio/
├── client/           # React frontend (Vite)
│   ├── public/
│   │   ├── assets/   # Real user photos (profile.jpg, cisco-cert.jpg)
│   │   └── images/   # AI-generated images
│   └── src/
│       ├── assets/generatedImages.js  # Central image constants
│       ├── three/    # Three.js R3F scene components
│       └── components/
└── server/           # Node.js + Express backend
    ├── models/       # Mongoose schemas
    ├── routes/       # API routes
    └── middleware/
```

---

## 🌐 Deployment

| Layer    | Service     | Notes |
|----------|-------------|-------|
| Frontend | **Vercel**  | Import `client/` as root. Add `VITE_API_URL` env var |
| Backend  | **Render**  | Set all env vars in Render dashboard |
| Database | **MongoDB Atlas** | Whitelist `0.0.0.0/0` for Render IPs |

### Vercel (frontend)
1. Connect GitHub repo
2. Set root directory to `client`
3. Build command: `npm run build`
4. Output directory: `dist`

### Render (backend)
1. New Web Service → connect repo
2. Root directory: `server`
3. Start command: `node index.js`
4. Add all env vars from `.env.example`

---

## 📞 Contact

Built by **Saktheesh Kanagaraj** — [saktheeshkanagaraj149@gmail.com](mailto:saktheeshkanagaraj149@gmail.com)
