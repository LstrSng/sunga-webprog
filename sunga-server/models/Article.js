const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
    {
        slug: { type: String, required: true, unique: true, trim: true },
        name: { type: String, required: true, unique: true, trim: true },
        title: { type: String, required: true, trim: true },
        image: { type: String, trim: true, default: '' },
        content: { type: [String], default: [] },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

module.exports = mongoose.models.Article || mongoose.model('Article', articleSchema);
