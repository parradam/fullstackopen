function Logout({ user, handleLogout }) {
  return (
    <>
      <div>{`${user.username} signed in`}</div>
      <button onClick={handleLogout}>Log out</button>
    </>
  );
}

export default Logout;
