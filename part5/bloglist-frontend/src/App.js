import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [message, setMessage] = useState(null)
    const blogFormRef = useRef()

    const [loginErrorMessage, setLoginErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const orderedBlogs = blogs.sort((a, b) => {
        return b.likes - a.likes
    })

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
            switch (exception.request.status) {
                case 401:
                    setLoginErrorMessage(
                        'Incorrect credentials: please try again.'
                    )
                    break
                default:
                    setLoginErrorMessage('An unknown error has occurred.')
            }
            setTimeout(() => {
                setLoginErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogout = async () => {
        window.localStorage.removeItem('loggedInBlogUser')
        setUser(null)
    }

    const createBlog = async (newBlog) => {
        try {
            const returnedBlog = await blogService.create(newBlog)
            returnedBlog.user = user
            setBlogs((prevState) => [...prevState, returnedBlog])

            blogFormRef.current.toggleVisibility()
            setMessage(`Blog "${returnedBlog.title}" was successfully added!`)
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        } catch (exception) {
            switch (exception.request.status) {
                case 400:
                    setMessage('Please check the details you entered.')
                    break
                case 401:
                    setMessage(
                        'You do not have permission to perform this action.'
                    )
                    break
                case 500:
                    setMessage(
                        'Oops! The blog could not be added. Please try again later.'
                    )
                    break
                default:
                    setMessage('An unknown error has occurred.')
            }
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    const handleLikeBlog = async (id, likes) => {
        try {
            await blogService.update(id, { likes: likes })
            const updatedBlog = blogs.find((blog) => blog.id === id)
            const likedBlog = { ...updatedBlog, likes: likes }
            const updatedBlogs = blogs.map((blog) =>
                blog.id !== id ? blog : likedBlog
            )
            setBlogs(updatedBlogs)
        } catch (exception) {
            switch (exception.request.status) {
                case 401:
                    setLoginErrorMessage(
                        'Incorrect credentials: please try again.'
                    )
                    break
                default:
                    setLoginErrorMessage('An unknown error has occurred.')
            }
            setTimeout(() => {
                setLoginErrorMessage(null)
            }, 5000)
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

    return (
        <>
            {user ? (
                <>
                    <h2>blog site</h2>
                    <Logout user={user} handleLogout={handleLogout} />
                    <Togglable
                        revealLabel={'New post'}
                        hideLabel={'Hide form'}
                        ref={blogFormRef}
                    >
                        <BlogForm createBlog={createBlog} />
                    </Togglable>
                    {message ?? <div>{message}</div>}
                </>
            ) : (
                <Togglable
                    revealLabel={'Show login'}
                    hideLabel={'Cancel login'}
                >
                    <LoginForm
                        username={username}
                        setUsername={setUsername}
                        password={password}
                        setPassword={setPassword}
                        handleLogin={handleLogin}
                        loginErrorMessage={loginErrorMessage}
                    />
                </Togglable>
            )}

            <h2>current blogs</h2>
            {blogs.length > 0 ? (
                <Blogs blogs={orderedBlogs} handleLikeBlog={handleLikeBlog} />
            ) : (
                <div>Be the first to add a blog!</div>
            )}
        </>
    )
}

export default App
