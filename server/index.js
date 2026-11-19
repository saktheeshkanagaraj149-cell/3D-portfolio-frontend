require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const { syncProjects } = require('./lib/syncProjects');

const app = express();
const PORT = process.env.PORT || 5000;

// CLIENT_URL can be a comma-separated list. Vercel preview URLs are allowed too.
const allowed = (process.env.CLIENT_URL || 'http://localhost:5173')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

app.set('trust proxy', 1); // Render sits behind a proxy; needed for rate limiting by IP
app.use(
    cors({
        origin(origin, cb) {
            if (!origin || allowed.includes(origin) || /\.vercel\.app$/.test(new URL(origin).hostname)) {
                return cb(null, true);
            }
            cb(null, false);
        },
        methods: ['GET', 'POST', 'OPTIONS'],
    })
);
app.use(express.json({ limit: '20kb' }));

app.use('/api/contact', require('./routes/contact'));
app.use('/api/projects', require('./routes/projects'));

app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        time: new Date().toISOString(),
    });
});

app.use(errorHandler);

// Start listening even if MongoDB is slow, so /api/projects can serve the fallback list.
app.listen(PORT, () => console.log(`Server on port ${PORT}`));

if (!process.env.MONGO_URI) {
    console.warn('MONGO_URI is not set; running without a database.');
} else {
    mongoose
        .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 })
        .then(async () => {
            console.log(`MongoDB connected (${mongoose.connection.name})`);
            // Keep the projects collection in step with client/src/data/projects.json.
            if (process.env.SYNC_ON_START !== 'false') {
                const n = await syncProjects({ prune: true });
                console.log(`Synced ${n} projects into MongoDB`);
            }
        })
        .catch(err => console.error('MongoDB connection failed:', err.message));
}
