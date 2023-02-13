import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
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
            setUser(userReturned)
            setUsername('')
            setPassword('')
        } catch (exception) {
            // wrong credentials
        }
    }

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
            <h2>blogs</h2>
            {user?.username && `${user.username} signed in`}
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    )
}

export default App
