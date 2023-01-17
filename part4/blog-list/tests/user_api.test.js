const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'newuser',
            name: 'New User',
            password: 'myPassword'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    }, 100000)

    test('creation fails with proper status code and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'thisPassword'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username must be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    }, 100000)

    test('creation fails with proper status code and message if username is not provided', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: '',
            name: 'Superuser',
            password: 'thisPassword'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(406)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username must be provided')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    }, 100000)

    test('creation fails with proper status code and message if username is <3 chars', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'ab',
            name: 'Superuser',
            password: 'thisPassword'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username must be at least 3 characters')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    }, 100000)

    test('creation fails with proper status code and message if password is not provided', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'newuser',
            name: 'Superuser',
            password: ''
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(406)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('password must be provided')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    }, 100000)

    test('creation fails with proper status code and message if password is <3 chars', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'newuser',
            name: 'Superuser',
            password: 'ab'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('password must be at least 3 characters')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    }, 100000)
})

afterAll(() => {
    mongoose.connection.close()
})