function LoginForm({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
  loginErrorMessage,
}) {
  return (
    <>
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
        {loginErrorMessage ?? <div>{loginErrorMessage}</div>}
      </form>
    </>
  );
}

export default LoginForm;
