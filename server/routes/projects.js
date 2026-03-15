const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Static fallback data (used if MongoDB is empty)
const staticProjects = [
    {
        title: 'AptIQ',
        description: 'Free and open-source aptitude preparation platform built for Indian engineering students. Led a multi-college team spanning Tamil Nadu and Karnataka. Delivered full platform with admin dashboard, authentication, and question bank.',
        stack: ['Next.js', 'Tailwind CSS', 'Supabase', 'Vercel'],
        github: 'https://github.com/saktheeshkanagaraj149-cell',
        live: '#',
        category: ['Open Source', 'Web'],
        status: 'Completed — 2026',
        year: 2026,
        order: 1,
        featured: true,
    },
    {
        title: 'Antigravity',
        description: 'Open-source multi-LLM development environment. Integrated and tested Claude Sonnet 4.6, Gemini (Latest), DeepSeek, Kimi AI, and Qwen (Local LLM) for AI-driven features, automation workflows, and prompt engineering experiments.',
        stack: ['React', 'Node.js', 'Multiple LLMs', 'Prompt Engineering'],
        github: 'https://github.com/saktheeshkanagaraj149-cell',
        live: '',
        category: ['AI', 'Open Source'],
        status: 'Active — 2026',
        year: 2026,
        order: 2,
        featured: true,
    },
    {
        title: 'Java Dojo',
        description: 'Interactive Java coding game with LLM-powered code evaluation using the Claude API. Built for engineering students to practice Java concepts in a gamified environment.',
        stack: ['React', 'Claude API', 'JavaScript'],
        github: 'https://github.com/saktheeshkanagaraj149-cell',
        live: '',
        category: ['AI', 'Web'],
        status: 'Completed',
        year: 2026,
        order: 3,
        featured: false,
    },
    {
        title: 'Portfolio Website',
        description: 'This very portfolio — built with MERN stack + Three.js 3D animations to impress recruiters and professors.',
        stack: ['React', 'Three.js', 'Node.js', 'MongoDB', 'GSAP', 'Framer Motion'],
        github: '',
        live: '#',
        category: ['Web'],
        status: 'Completed — 2026',
        year: 2026,
        order: 4,
        featured: false,
    },
    {
        title: 'Vehicle Diagnostic System',
        description: 'Combines 4+ years of automobile expertise with software logic to diagnose mechanical issues through structured troubleshooting.',
        stack: ['JavaScript', 'Node.js'],
        github: '',
        live: '',
        category: ['Web'],
        status: 'Concept',
        year: 2026,
        order: 5,
        featured: false,
    },
];

// GET /api/projects
router.get('/', async (req, res, next) => {
    try {
        let projects = await Project.find().sort({ order: 1 });
        if (!projects.length) projects = staticProjects;
        res.json({ success: true, data: projects });
    } catch (err) {
        next(err);
    }
});

// GET /api/health
router.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});

module.exports = router;
