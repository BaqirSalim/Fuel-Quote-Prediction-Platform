export default function Root() {
    return (
        <div className="container">
        <h1>Welcome to the Home Page</h1>
        <a href="/login"><button className="loginButton">Login</button></a>
        <a href="/register"><button className="registerButton">Register</button></a>
    </div>
    );
  }