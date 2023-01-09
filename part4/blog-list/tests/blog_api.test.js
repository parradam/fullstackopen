const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 10000)

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 10000)

test('unique identifier for blog is returned, and is id, not _id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
}, 10000)

test('a valid blog can be posted and is added to the database', async () => {
    const blogPost = {
        title: 'a valid blog can be posted',
        author: 'Voltaire',
        url: 'v.com',
        likes: 9999
    }

    await api
        .post('/api/blogs')
        .send(blogPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(
        'a valid blog can be posted'
    )
}, 10000)

test('a blog with a missing title cannot be posted and is not added to the database', async () => {
    const blogPost = {
        author: 'url but no title',
        url: 'a.com',
        likes: 9999
    }

    await api
        .post('/api/blogs')
        .send(blogPost)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
}, 100000)

test('a blog with a missing url cannot be posted and is not added to the database', async () => {
    const blogPost = {
        title: 'title but no url',
        author: 'Dave',
        likes: 9999
    }

    await api
        .post('/api/blogs')
        .send(blogPost)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
}, 100000)

test('a blog with a missing likes property defaults to 0', async () => {
    const blogPost = {
        title: 'likes should be 0',
        author: 'Dave',
        url: 'v.com',
    }

    const response = await api
        .post('/api/blogs')
        .send(blogPost)
        .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const blogPostInDb = blogsAtEnd.filter(b => b.id === response.body.id)
    expect(blogPostInDb[0]).toHaveProperty('likes', 0)
}, 100000)

afterAll(() => {
    mongoose.connection.close()
})