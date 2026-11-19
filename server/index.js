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

function isAllowedOrigin(origin) {
    if (!origin || allowed.includes(origin)) return true;
    try {
        return /\.vercel\.app$/.test(new URL(origin).hostname);
    } catch {
        return false; // e.g. "Origin: null" from sandboxed pages
    }
}

app.set('trust proxy', 1); // Render sits behind a proxy; needed for rate limiting by IP
app.use(
    cors({
        origin(origin, cb) {
            cb(null, isAllowedOrigin(origin));
        },
        methods: ['GET', 'POST', 'OPTIONS'],
    })
);
app.use(express.json({ limit: '20kb' }));

app.use('/api/contact', require('./routes/contact'));
app.use('/api/projects', require('./routes/projects'));

// Why the database isn't connected, without leaking the URI or credentials.
let dbProblem = process.env.MONGO_URI ? 'connecting' : 'MONGO_URI not set';

function describeDbError(err) {
    const m = `${err.name} ${err.message} ${err.reason?.type || ''}`;
    if (/bad auth|authentication failed|auth/i.test(m)) return 'wrong username or password in MONGO_URI';
    if (/ENOTFOUND|querySrv|ENODATA|EREFUSED/i.test(m)) return 'cluster host not found (check MONGO_URI host, or the Atlas cluster was deleted)';
    if (/whitelist|IP|ReplicaSetNoPrimary|Server selection timed out|ETIMEDOUT|ECONNREFUSED/i.test(m))
        return "can't reach the cluster (Atlas Network Access must allow 0.0.0.0/0, or the free cluster is paused)";
    if (/Invalid scheme|URI|parse/i.test(m)) return 'MONGO_URI is not a valid mongodb:// or mongodb+srv:// string';
    return 'connection failed (see Render logs)';
}

app.get('/api/health', (_req, res) => {
    const connected = mongoose.connection.readyState === 1;
    res.json({
        status: 'ok',
        db: connected ? 'connected' : 'disconnected',
        ...(connected ? { database: mongoose.connection.name } : { dbProblem }),
        time: new Date().toISOString(),
    });
});

app.use(errorHandler);

// Start listening even if MongoDB is slow, so /api/projects can serve the fallback list.
app.listen(PORT, () => console.log(`Server on port ${PORT}`));

async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });
        dbProblem = null;
        console.log(`MongoDB connected (${mongoose.connection.name})`);
        // Keep the projects collection in step with client/src/data/projects.json.
        if (process.env.SYNC_ON_START !== 'false') {
            const n = await syncProjects({ prune: true });
            console.log(`Synced ${n} projects into MongoDB`);
        }
    } catch (err) {
        dbProblem = describeDbError(err);
        console.error('MongoDB connection failed:', err.message);
        await mongoose.disconnect().catch(() => {});
        // Retry, e.g. after the Atlas cluster is resumed or the IP list is fixed.
        setTimeout(connectDb, 30000);
    }
}

if (!process.env.MONGO_URI) {
    console.warn('MONGO_URI is not set; running without a database.');
} else {
    connectDb();
}
