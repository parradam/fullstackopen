const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

// user for blog testing purposes
const newUser = {
    _id: '63e4243eda277b1aeb776990',
    username: 'newuser',
    name: 'New User',
    password: 'myPassword',
}

const initialBlogs = [
    {
        _id: '63e4254bf5d10c65e3ecd5f0',
        title: 'Test blog 1',
        author: 'Dave',
        url: 'abc.com',
        likes: '200',
        user: newUser._id,
    },
    {
        _id: '63e4254bf5d10c65e3ecd5f1',
        title: 'Test blog 2',
        author: 'John',
        url: 'xyz.com',
        likes: '400',
        user: '63e4243eda277b1aeb776999',
    },
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map((user) => user.toJSON())
}

const loginHelper = async (api, username, password) => {
    const response = api
        .post('/api/login')
        .send({ username: username, password: password })
    return response
}

const createUserForBlog = async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash(newUser.password, 10)
    const user = new User({
        _id: newUser._id,
        username: newUser.username,
        passwordHash: passwordHash,
    })
    await user.save()

    return user
}

module.exports = {
    initialBlogs,
    newUser,
    blogsInDb,
    usersInDb,
    loginHelper,
    createUserForBlog,
}
