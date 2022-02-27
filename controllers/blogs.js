const router = require('express').Router();
const Blog = require('../models/blog');

// desc: get all blogs
router.get('/', async (req, res) => {
    const blogs = await Blog.find();
    if (blogs) {
        res.status(200).json(blogs);
    } else {
        res.status(404).json({ error: 'blogs cannot be returned' });
    }
});

// // desc: get single blog
router.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
        res.status(200).json(blog);
    } else {
        res.status(404).json({ error: 'blog cannot be retrieved' });
    }
});

// // desc: create new blog
router.post('/', async (req, res) => {
    const body = req.body;

    // create blog object
    const blog = new Blog({
        author: body.author,
        title: body.title,
        content: body.content
    });

    // save blog
    const savedBlog = await blog.save();
    if (savedBlog) {
        res.status(201).json(savedBlog);
    } else {
        res.status(400).json({ error: 'Blog cannot be created' });
    }
});

// desc: delete blog
router.delete('/:id', async (req, res) => {
    const blogToDelete = await Blog.findByIdAndDelete(req.params.id);
    if (blogToDelete) {
        res.status(204).end();
    } else {
        res.status(400).json({ error: 'Blog cannot be deleted' });
    }
});

// desc: update blog
router.put('/:id', async (req, res) => {
    const body = req.body;

    const blog = {
        author: body.author,
        title: body.title,
        content: body.content,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true });

    if (updatedBlog) {
        res.status(204).end();
    } else {
        res.status(400).json({ error: 'blog cannot be updated' });
    }
});

// export router
module.exports = router;