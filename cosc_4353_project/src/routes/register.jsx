import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

export default function Register(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const {logins, addLogin} = useLogin();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(username == '' || password == '')
        {
            setError("Username or Password empty")
        }
        else
        {
            addLogin({username: username, password: password})
            navigate('/login')
        }
    }
    
    return (
        <div>
            <h2>Client Registration</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="reg-username">Username:</label>
                <input
                type="text"
                id="reg-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                /><br/>
                <label htmlFor="reg-password">Password:</label>
                <input
                type="password"
                id="reg-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                /><br/>
                <button>Register Here!</button>
            </form>
            <p>{error}</p>
        </div>
    );
}