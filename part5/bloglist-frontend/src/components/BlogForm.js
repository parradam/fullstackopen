function BlogForm({ newBlog, setNewBlog, handleSubmitBlog, message }) {
  return (
    <>
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
        {message ?? <div>{message}</div>}
      </form>
    </>
  );
}

export default BlogForm;
