import PropTypes from 'prop-types'

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
                        id="username"
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <div>
                    <button id="login-button" type="submit">
                        Log in
                    </button>
                </div>
                {loginErrorMessage && <div>{loginErrorMessage}</div>}
            </form>
        </>
    )
}

LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
    loginErrorMessage: PropTypes.string,
}

export default LoginForm
