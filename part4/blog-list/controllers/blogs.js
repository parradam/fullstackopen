const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, config.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if (!user) return response.status(400).json({ error: 'user id not found' })

    const blog = new Blog({
        title: body.title,
        author: user.name,
        url: body.url,
        likes: body.likes,
        user: user.id,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id

    const decodedToken = jwt.verify(request.token, config.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(id)
    if (blog.user.toString() === decodedToken.id) {
        await Blog.findByIdAndDelete(id)
        return response.status(204).end()
    } else {
        return response.status(400).json({ error: 'only the creator can delete the blog' })
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id

    const { title, author, url, likes } = request.body
    const blogUpdate = {
        ...(title && { title: title }),
        ...(author && { author: author }),
        ...(url && { url: url }),
        ...(likes && { likes: likes }),
    }

    const query = await Blog.findByIdAndUpdate(id, blogUpdate)

    if (!query) return response.status(404).end()
    response.status(200).end()
})

module.exports = blogsRouter