const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        slug: { type: String, required: true, unique: true, trim: true },
        title: { type: String, required: true, trim: true },
        kind: { type: String, default: '' },
        year: { type: Number },
        summary: { type: String, required: true },
        detail: { type: String, default: '' },
        stack: [{ type: String }],
        repo: { type: String, default: '' },
        repo2: { type: String, default: '' },
        live: { type: String, default: '' },
        image: { type: String, default: '' },
        featured: { type: Boolean, default: false },
        order: { type: Number, default: 0 },
        // filled in by `npm run seed` from the GitHub API
        stars: { type: Number, default: 0 },
        lastPush: { type: Date },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
