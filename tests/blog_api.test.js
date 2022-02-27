const Blog = require('../models/blog');
const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);
const mongoose = require('mongoose');

jest.setTimeout(10000);

const initialBlogs = [
    {
        author: "Blog Author",
        title: "Blog Title",
        content: "Blog Content",
        id: "621ba4cdda3c3276239cf4b0"
    },
    {
        author: "Blog Author 2",
        title: "Blog Title 2",
        content: "Blog Content 2",
        id: "621ba99c3f950aafbab08d7a"
    }
];

// this functionalty ensures that everytime we run the tests database will be in the same state as before
beforeEach(async () => {
    await Blog.deleteMany({});
    let blogObject = new Blog(initialBlogs[0]);
    await blogObject.save();
    blogObject = new Blog(initialBlogs[1]);
    await blogObject.save();
});

describe('getting blogs', () => {
    test('all blogs are returned', async () => {
        const response = await request.get('/api/blogs');    
        expect(response.body).toHaveLength(initialBlogs.length);
    });

    test('blogs when given invalid endpoint are not returned', async () => {
        await request.get('/api/blogss').expect(404);
    });

    test('single blog is returned', async () => {
        const blogs = await request.get('/api/blogs');
        const response = await request
            .get(`/api/blogs/${blogs.body[0].id}`)
            .expect(200)
    });

    test(`the first blog source is ${initialBlogs[0].source}`, async () => {
        const response = await request.get('/api/blogs');
        expect(response.body[0].source).toBe(initialBlogs[0].source);
    });

    test('blog with malformatted id is not returned', async () => {
        await request.get('/api/blogs/61fd86f19d7eaa117599b2badsadsadsadasd').expect(500);
    });
});

describe('adding blogs', () => {
    test('blog can be added', async () => {
        const blog = {
            author: "Blog 3 author",
            title: "Blog 3 title",
            content: "Blog 3 content",
        };

        await request
            .post('/api/blogs')
            .send(blog)
            .expect(201)
    });

    test('blog without title cannot be added', async () => {
        const blog = {
            author: "Blog Author",
            content: "Blog Content",
        };

        await request
            .post('/api/blogs')
            .send(blog)
            .expect(500);
    });
});

describe('deleting blogs', () => {
    test('blog can be deleted', async () => {
        // get all blogs
        const blogs = await request.get('/api/blogs');
        // find the article to delete
        const blogToDelete = blogs.body[0];
        await request
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
    });

    test('blog with malformatted id cannot be deleted', async () => {
        await request
            .delete('/api/blogs/61fea96d131adcb158d411f4dasdasdasd')
            .expect(500)
    });
});

describe('updating blogs', () => {
    test('blog with malformatted id cannot be updated', async () => {
        const updatedBlog = {
            author: 'Blog author update',
            title: 'Blog title update',
            content: 'Blog content update',
        };
        // get all blogs
        const blogs = await request.get('/api/blogs');
        // find the blog to update
        let blogToUpdate = blogs.body[0];
        blogToUpdate.id = 'blablabla';
        // update blog
        await request
            .put(`/api/blogs/${blogToUpdate.id}`, updatedBlog)
            .expect(500)
    });
});

// after everything is done close the connection
afterAll(() => {
    mongoose.connection.close();
});