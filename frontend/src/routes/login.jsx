import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/root.css"
import { useAuth } from "../context/authContext";
import axios from 'axios';

export default function Login(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const {login} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/user/login', {username, password});           
            //should be backend validation
            // if(username == '' || password == '')
            // {
            //     setError("Username or Password empty")
            // }
            if(response.status === 200)
            {
                navigate('/profile_form')
            }
        } catch (error) {
            if(error.response.status === 402)
            {
                setError("Username or Password empty")
            }
            else if(error.response.status === 401)
            {
                setError("Username or Password incorrect")
            }
            else
            {
                console.log(error.message)
                setError("Unexpected error occurred")
            }
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
                <p className="registerText">Don&apos;t have an account? <a href="/register">Register here</a></p>
                <p>{error}</p>
            </div>
        </div>
    );
}