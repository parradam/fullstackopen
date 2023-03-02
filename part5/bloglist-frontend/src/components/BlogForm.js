import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const initialNewBlog = {
        title: '',
        author: '',
        url: '',
    }

    const [newBlog, setNewBlog] = useState(initialNewBlog)

    const handleSubmitBlog = (event) => {
        event.preventDefault()

        createBlog(newBlog)
        setNewBlog(initialNewBlog)
    }

    return (
        <>
            <h3>create new</h3>
            <form onSubmit={handleSubmitBlog}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        value={newBlog?.title}
                        name="title"
                        placeholder="Enter a title..."
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
                        id="author"
                        type="text"
                        value={newBlog?.author}
                        name="author"
                        placeholder="Enter the author..."
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
                        id="url"
                        type="text"
                        value={newBlog?.url}
                        name="url"
                        placeholder="Enter a URL..."
                        onChange={({ target }) =>
                            setNewBlog((prevState) => ({
                                ...prevState,
                                url: target.value,
                            }))
                        }
                    />
                </div>
                <div>
                    <button id="blog-button" type="submit">
                        Create
                    </button>
                </div>
            </form>
        </>
    )
}

export default BlogForm
