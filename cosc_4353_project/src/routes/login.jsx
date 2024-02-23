import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <div>
            <h2>Client Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="log-username">Username:</label>
                <input
                type="text"
                id="log-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                /><br/>
                <label htmlFor="log-password">Password:</label>
                <input
                type="password"
                id="log-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                /><br/>
                <button>Login Here!</button>
            </form>
            <p>{error}</p>
        </div>
    );
}