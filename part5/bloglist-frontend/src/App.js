import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Login from "./components/Login";
import Logout from "./components/Logout";

const App = () => {
  const initialNewBlog = {
    title: "",
    author: "",
    url: "",
  };

  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState(initialNewBlog);
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const userReturned = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(
        "loggedInBlogUser",
        JSON.stringify(userReturned)
      );

      blogService.setToken(userReturned.token);
      setUser(userReturned);
      setUsername("");
      setPassword("");
    } catch (exception) {
      switch (exception.request.status) {
        case 401:
          setMessage("Incorrect credentials: please try again.");
          break;
        default:
          setMessage("An unknown error has occurred.");
      }
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem("loggedInBlogUser");
    setUser(null);
  };

  const handleSubmitBlog = async (event) => {
    event.preventDefault();

    try {
      const returnedBlog = await blogService.create(newBlog);
      setBlogs((prevState) => [...prevState, returnedBlog]);
      setNewBlog(initialNewBlog);

      setMessage(`Blog "${returnedBlog.title}" was successfully added!`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      switch (exception.request.status) {
        case 400:
          setMessage("Please check the details you entered.");
          break;
        case 401:
          setMessage("You do not have permission to perform this action.");
          break;
        case 500:
          setMessage(
            "Oops! The blog could not be added. Please try again later."
          );
          break;
        default:
          setMessage("An unknown error has occurred.");
      }
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  useEffect(() => {
    const loggedInBlogUserJSON =
      window.localStorage.getItem("loggedInBlogUser");
    if (loggedInBlogUserJSON) {
      const loggedInBlogUser = JSON.parse(loggedInBlogUserJSON);
      blogService.setToken(loggedInBlogUser.token);
      setUser(loggedInBlogUser);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  if (!user) {
    return (
      <Login
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        message={message}
      />
    );
  }
  return (
    <>
      <h2>blog site</h2>
      {user?.username && <Logout user={user} handleLogout={handleLogout} />}
      <BlogForm
        newBlog={newBlog}
        setNewBlog={setNewBlog}
        handleSubmitBlog={handleSubmitBlog}
        message={message}
      />
      <h3>current blogs</h3>
      {blogs.length > 0 ? (
        <Blogs blogs={blogs} />
      ) : (
        <div>Be the first to add a blog!</div>
      )}
    </>
  );
};

export default App;
