const express = require('express');
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');

const router = express.Router();

// Create Blog
router.post('/', auth, async (req, res) => {
  const { title, content } = req.body;
  try {
    const blog = new Blog({ title, content, author: req.user.id });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read All Blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'username');
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read Blog by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'username');
    if (!blog) return res.status(404).json({ msg: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Blog
router.put('/:id', auth, async (req, res) => {
  const { title, content } = req.body;
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: 'Blog not found' });

    if (blog.author.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    blog.title = title;
    blog.content = content;
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Blog
router.delete('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: 'Blog not found' });

    if (blog.author.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    await blog.remove();
    res.json({ msg: 'Blog removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
