const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'Test blog 1',
        author: 'Dave',
        url: 'abc.com',
        likes: '200'
    },
    {
        title: 'Test blog 2',
        author: 'John',
        url: 'xyz.com',
        likes: '400'
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb,
    usersInDb,
}