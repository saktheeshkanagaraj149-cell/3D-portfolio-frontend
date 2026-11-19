# Saktheesh Kanagaraj — portfolio

Live: https://3-d-portfolio-frontend-wheat.vercel.app · Résumé: [/resume/](https://3-d-portfolio-frontend-wheat.vercel.app/resume/)

React + Vite frontend with a small Three.js scene (two meshing gears), and an Express + MongoDB API that
serves the project list and stores contact-form messages.

```
client/                     React app (Vercel, root directory = client)
  src/data/projects.json    ← the project list. Edit this to add/remove projects.
  public/projects/          screenshots of the live sites
  public/resume/            résumé page + PDF
server/                     Express API (Render, root directory = server)
  lib/syncProjects.js       copies projects.json into MongoDB (+ GitHub stars / last push)
  routes/projects.js        GET /api/projects  (MongoDB, falls back to projects.json)
  routes/contact.js         POST /api/contact  (saved to MongoDB, optional Gmail notification)
```

## How the database is used

- **projects** collection: on every start the server upserts everything in `client/src/data/projects.json`
  (matched by `slug`), adds star count and last push date from the GitHub API, and removes projects that
  were deleted from the file. So: edit the JSON, push, and Render redeploys and updates MongoDB.
  Set `SYNC_ON_START=false` to manage the collection by hand instead.
- **contacts** collection: every contact-form message.
- If MongoDB is unreachable the site still works: the frontend ships with the same JSON and the API
  falls back to it.

## Run locally

```bash
# API
cd server
cp .env.example .env        # put your MongoDB Atlas URI in MONGO_URI
npm install
npm run dev                 # http://localhost:5000/api/health
npm run seed                # optional: sync projects into MongoDB without starting the server

# Frontend (second terminal)
cd client
npm install
npm run dev                 # http://localhost:5173  (/api is proxied to :5000)
```

## Deploy

| Part | Where | Settings |
|---|---|---|
| Frontend | Vercel | Root directory `client`. Env: `VITE_API_URL=https://<your-render-service>.onrender.com` |
| API | Render | Root directory `server`, start `npm start`. Env: `MONGO_URI`, `CLIENT_URL`, optional `EMAIL_USER` / `EMAIL_PASS` / `EMAIL_TO`, `GITHUB_TOKEN` |
| Database | MongoDB Atlas | Network access must allow Render (0.0.0.0/0 on the free tier) |

## Updating the résumé

Edit `client/public/resume/index.html`, then regenerate the PDF (Windows, Edge):

```bash
"C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless=new --no-pdf-header-footer \
  --print-to-pdf="client/public/resume/Saktheesh_Kanagaraj_Resume.pdf" client/public/resume/index.html
```
