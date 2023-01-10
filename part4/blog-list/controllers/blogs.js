const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    console.log('post')

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id

    console.log('delete')

    await Blog.findByIdAndDelete(id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id

    console.log('put')

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