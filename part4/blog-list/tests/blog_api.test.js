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

describe('get requests', () => {
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
})

describe('post requests', () => {
    test('a valid blog can be posted and is added to the database', async () => {
        const users = await helper.usersInDb()
        const user = users[0]

        const blogPost = {
            title: 'a valid blog can be posted',
            author: 'Voltaire',
            url: 'v.com',
            likes: 9999,
            userId: user.id
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
        const users = await helper.usersInDb()
        const user = users[0]

        const blogPost = {
            author: 'url but no title',
            url: 'a.com',
            likes: 9999,
            userId: user.id
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
        const users = await helper.usersInDb()
        const user = users[0]

        const blogPost = {
            title: 'likes should be 0',
            author: 'Dave',
            url: 'v.com',
            userId: user.id
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
})

describe('delete requests', () => {
    test('deleting a blog with a valid ID should update the database', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const firstBlogId = blogsAtStart[0].id

        await api
            .delete(`/api/blogs/${firstBlogId}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    }, 100000)

    test('deleting a blog with an invalid ID should not update the database, and return 404', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const firstBlogId = blogsAtStart[0].id

        await api
            .delete(`/api/blogs/${firstBlogId}1`)
            .expect(404)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    }, 100000)

    test('deleting a blog twice should update the database returning 204, and then return 204', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const firstBlogId = blogsAtStart[0].id

        await api
            .delete(`/api/blogs/${firstBlogId}`)
            .expect(204)

        const blogsAfterFirstDelete = await helper.blogsInDb()
        expect(blogsAfterFirstDelete).toHaveLength(helper.initialBlogs.length - 1)

        await api
            .delete(`/api/blogs/${firstBlogId}`)
            .expect(204)

        expect(blogsAfterFirstDelete).toHaveLength(helper.initialBlogs.length - 1)
    }, 100000)
})

describe('put requests', () => {
    test('number of likes can be updated, returning 200', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const firstBlogId = blogsAtStart[0].id

        const blogPostUpdate = {
            likes: 1111
        }

        await api
            .put(`/api/blogs/${firstBlogId}`)
            .send(blogPostUpdate)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

        const blogPostInDb = blogsAtEnd.filter(b => b.id === firstBlogId)
        expect(blogPostInDb[0]).toHaveProperty('likes', 1111)
    }, 100000)

    test('updating a blog that has been deleted should return 404', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const firstBlogId = blogsAtStart[0].id

        const blogPostUpdate = {
            likes: 1234
        }

        // first delete blog
        await api
            .delete(`/api/blogs/${firstBlogId}`)
            .expect(204)

        // then attempt put to deleted blog
        await api
            .put(`/api/blogs/${firstBlogId}`)
            .send(blogPostUpdate)
            .expect(404)
    }, 100000)

    test('updating a blog with an invalid ID should return 404', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const firstBlogId = blogsAtStart[0].id

        const blogPostUpdate = {
            likes: 6789
        }

        await api
            .put(`/api/blogs/${firstBlogId}1`)
            .send(blogPostUpdate)
            .expect(404)
    }, 100000)
})

afterAll(() => {
    mongoose.connection.close()
})