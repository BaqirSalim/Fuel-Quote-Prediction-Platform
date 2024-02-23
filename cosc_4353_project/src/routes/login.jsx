import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/root.css"

export default function Login(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        if(username == '' || password == '')
        {
            setError("Username or Password empty")
        }
        else
        {
            navigate('/profile')
        }
    }
    
    return (
        <div className="container">
            <div className="box">
                <h2>Welcome</h2>
                <form onSubmit={handleSubmit}>
                    <div className="textbox">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="textbox">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <input type="submit" className="loginButton" value="Login" />
                </form>
                <p className="registerText">Don't have an account? <a href="/register">Register here</a></p>
                <p>{error}</p>
            </div>
        </div>
    );
}