import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const initialNewBlog = {
        title: '',
        author: '',
        url: '',
    }

    const [blogs, setBlogs] = useState([])
    const [newBlog, setNewBlog] = useState(initialNewBlog)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const userReturned = await loginService.login({
                username,
                password,
            })

            window.localStorage.setItem(
                'loggedInBlogUser',
                JSON.stringify(userReturned)
            )

            blogService.setToken(userReturned.token)
            setUser(userReturned)
            setUsername('')
            setPassword('')
        } catch (exception) {
            // wrong credentials
        }
    }

    const handleLogout = async () => {
        window.localStorage.removeItem('loggedInBlogUser')
        setUser(null)
    }

    const handleSubmitBlog = async (event) => {
        event.preventDefault()

        try {
            const returnedBlog = await blogService.create(newBlog)
            setBlogs((prevState) => [...prevState, returnedBlog])
            setNewBlog(initialNewBlog)
        } catch (exception) {
            // handle error
        }
    }

    useEffect(() => {
        const loggedInBlogUserJSON =
            window.localStorage.getItem('loggedInBlogUser')
        if (loggedInBlogUserJSON) {
            const loggedInBlogUser = JSON.parse(loggedInBlogUserJSON)
            blogService.setToken(loggedInBlogUser.token)
            setUser(loggedInBlogUser)
        }
    }, [])

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
    }, [])

    if (!user) {
        return (
            <div>
                <h2>Log in to application</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            value={username}
                            name="Username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            value={password}
                            name="Password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <div>
                        <button type="submit">Log in</button>
                    </div>
                </form>
            </div>
        )
    }
    return (
        <div>
            <h2>blog site</h2>
            {user?.username && `${user.username} signed in`}{' '}
            <button onClick={handleLogout}>Log out</button>
            <h3>create new</h3>
            <form onSubmit={handleSubmitBlog}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        value={newBlog?.title}
                        name="title"
                        onChange={({ target }) =>
                            setNewBlog((prevState) => ({
                                ...prevState,
                                title: target.value,
                            }))
                        }
                    />
                </div>
                <div>
                    <label htmlFor="author">Author</label>
                    <input
                        type="text"
                        value={newBlog?.author}
                        name="author"
                        onChange={({ target }) =>
                            setNewBlog((prevState) => ({
                                ...prevState,
                                author: target.value,
                            }))
                        }
                    />
                </div>
                <div>
                    <label htmlFor="url">URL</label>
                    <input
                        type="text"
                        value={newBlog?.url}
                        name="url"
                        onChange={({ target }) =>
                            setNewBlog((prevState) => ({
                                ...prevState,
                                url: target.value,
                            }))
                        }
                    />
                </div>
                <div>
                    <button type="submit">Create</button>
                </div>
            </form>
            <h3>current blogs</h3>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    )
}

export default App
