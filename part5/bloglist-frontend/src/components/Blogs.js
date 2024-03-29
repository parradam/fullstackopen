import Togglable from './Togglable'

const Blogs = ({ blogs, user, handleLikeBlog, handleRemoveBlog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    return blogs.map((blog) => (
        <div className="blog" key={blog.id} style={blogStyle}>
            <div>
                {blog.title} - {blog.author}
            </div>
            <Togglable revealLabel="Show details" hideLabel="Hide details">
                <div>
                    Likes: {blog.likes}{' '}
                    <button
                        id="like-button"
                        onClick={() => handleLikeBlog(blog.id, blog.likes + 1)}
                    >
                        Like
                    </button>
                </div>
                <div>
                    URL: <a href={`http://${blog.url}`}>Visit</a>
                </div>
                <div>
                    Added by: {blog.user?.name ? blog.user.name : 'Unknown'}
                </div>
                <div>
                    {user &&
                        user.username &&
                        blog.user &&
                        blog.user.name === user.name && (
                            <button
                                id="remove-button"
                                onClick={() => handleRemoveBlog(blog.id)}
                            >
                                Remove
                            </button>
                        )}
                </div>
            </Togglable>
        </div>
    ))
}

export default Blogs
