const express = require('express');
const mongoose = require('mongoose');
const Project = require('../models/Project');

const router = express.Router();

const { loadProjects } = require('../lib/syncProjects');

// Same list the frontend ships with. Used when the database is down or empty,
// so the site never shows a blank projects section.
const fallback = loadProjects();

// GET /api/projects
router.get('/', async (_req, res, next) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.json({ success: true, source: 'fallback', data: fallback });
        }
        const projects = await Project.find().sort({ order: 1 }).lean();
        if (!projects.length) {
            return res.json({ success: true, source: 'fallback', data: fallback });
        }
        res.json({ success: true, source: 'db', data: projects });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
