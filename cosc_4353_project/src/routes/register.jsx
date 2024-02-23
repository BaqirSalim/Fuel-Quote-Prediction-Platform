import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    return (
        <div>
            <h2>Client Registration</h2>
            <form action="/login" method="POST">
                <label htmlFor="reg-username">Username:</label>
                <input
                type="text"
                id="re-username"
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
                <button onClick={()=>
                    navigate('/login')
                }>Register Here!</button>
            </form>
        </div>
    );
}