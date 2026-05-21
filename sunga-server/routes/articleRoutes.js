const express = require('express');
const Article = require('../models/Article');

const router = express.Router();

const createSlug = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const normalizeContent = (content) => {
  if (Array.isArray(content)) {
    return content.map((paragraph) => String(paragraph).trim()).filter(Boolean);
  }

  return String(content || '')
    .split('\n')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
};

const buildArticlePayload = (body) => {
  const title = String(body.title || '').trim();
  const slug = createSlug(body.slug || body.name || title);

  return {
    slug,
    name: slug,
    title,
    image: String(body.image || '').trim(),
    content: normalizeContent(body.content),
    isActive: body.isActive ?? true,
  };
};

const serializeArticle = (article) => {
  const data = article.toObject ? article.toObject() : article;
  const slug = data.slug || data.name || String(data._id);

  return {
    ...data,
    slug,
    name: data.name || slug,
    title: data.title || 'Untitled Article',
    content: normalizeContent(data.content),
    isActive: data.isActive ?? true,
  };
};

router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json({ articles: articles.map(serializeArticle) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const article = await Article.findOne({
      $or: [{ slug: req.params.slug }, { name: req.params.slug }],
    });

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(serializeArticle(article));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const payload = buildArticlePayload(req.body);

    if (!payload.title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    if (!payload.slug) {
      return res.status(400).json({ message: 'Slug is required' });
    }

    const article = await Article.create(payload);
    res.status(201).json(article);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'An article with this slug already exists.' });
    }

    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const payload = buildArticlePayload(req.body);

    if (!payload.title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const article = await Article.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'An article with this slug already exists.' });
    }

    res.status(400).json({ message: error.message });
  }
});

router.patch('/:id/status', async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { isActive: req.body.isActive },
      { new: true, runValidators: true }
    );

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
