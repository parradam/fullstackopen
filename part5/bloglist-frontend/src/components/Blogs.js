import Togglable from './Togglable'

const Blogs = ({ blogs, handleLikeBlog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    return blogs.map((blog) => (
        <div key={blog.id} style={blogStyle}>
            <div>
                {blog.title} - {blog.author}
            </div>
            <Togglable revealLabel="Show details" hideLabel="Hide details">
                <div>
                    Likes: {blog.likes}{' '}
                    <button
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
            </Togglable>
        </div>
    ))
}

export default Blogs
