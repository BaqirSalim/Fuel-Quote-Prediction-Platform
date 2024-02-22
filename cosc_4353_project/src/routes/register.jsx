import { useState } from "react";

export default function Register(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div>
            <input 
            className="usernameInput"
            value={username}
            placeholder="Enter your username here"
            onChange={(e) => setUsername(e.target.value)}
            />
            <input 
            className="passwordInput"
            value={password}
            placeholder="Enter your password here"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            />
            <a href="/login">Register Here!</a>
        </div>
    );
}