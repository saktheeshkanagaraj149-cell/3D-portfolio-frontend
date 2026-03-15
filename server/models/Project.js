const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        stack: [{ type: String }],
        github: { type: String, default: '' },
        live: { type: String, default: '' },
        category: [{ type: String }],
        status: { type: String, default: 'Active' },
        year: { type: Number },
        order: { type: Number, default: 0 },
        featured: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
