const Blogs = ({ blogs }) =>
  blogs.map((blog) => (
    <div key={blog.id}>
      {blog.title} {blog.author}
    </div>
  ));

export default Blogs;
