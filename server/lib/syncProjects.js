const Project = require('../models/Project');

function loadProjects() {
    try {
        // eslint-disable-next-line global-require
        return require('../../client/src/data/projects.json');
    } catch {
        return [];
    }
}

async function githubInfo(repoUrl) {
    const m = /github\.com\/([^/]+)\/([^/#?]+)/.exec(repoUrl || '');
    if (!m) return {};
    const headers = { 'User-Agent': 'portfolio-sync', Accept: 'application/vnd.github+json' };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    try {
        const res = await fetch(`https://api.github.com/repos/${m[1]}/${m[2]}`, { headers });
        if (!res.ok) return {};
        const r = await res.json();
        return { stars: r.stargazers_count, lastPush: r.pushed_at };
    } catch {
        return {};
    }
}

/**
 * Upserts every project from client/src/data/projects.json into MongoDB by slug,
 * with star count and last push date from GitHub.
 * prune: also delete projects whose slug is no longer in the file.
 */
async function syncProjects({ prune = false, log = () => {} } = {}) {
    const projects = loadProjects();
    if (!projects.length) return 0;

    for (const p of projects) {
        const gh = await githubInfo(p.repo);
        await Project.updateOne({ slug: p.slug }, { $set: { ...p, ...gh } }, { upsert: true });
        log(`  ✓ ${p.title}${gh.stars !== undefined ? ` (${gh.stars}★)` : ''}`);
    }
    if (prune) {
        const { deletedCount } = await Project.deleteMany({ slug: { $nin: projects.map(p => p.slug) } });
        log(`Removed ${deletedCount} old project(s).`);
    }
    return projects.length;
}

module.exports = { syncProjects, loadProjects };
