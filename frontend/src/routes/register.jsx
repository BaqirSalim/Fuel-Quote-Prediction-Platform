import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import axios from "axios";

export default function Register(){
    const {register} = useAuth();
    const [nameInput, setNameInput] = useState('')
    const [passInput, setPassInput] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(nameInput == '' || passInput == '')
        {
            setError("Username or Password empty")
        }
        else
        {
            register({ username: nameInput, password: passInput })
            setNameInput('')
            setPassInput('')
            navigate('/login')
        }

        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/user/register', {username:nameInput, password:passInput});           
            //should be backend validation
            // if(username == '' || password == '')
            // {
            //     setError("Username or Password empty")
            // }
            if(response.status === 200)
            {
                navigate('/login')
            }
            else if(response.status === 401)
            {
                setError("Username or password not long enough")
            }
            else
            {
                setError("Unknown error occurred")
            }
        } catch (error) {
            // setError(error)
        }
    }
    
    return (
        <div>
            <h2>Client Registration</h2>
            {/* later we will change this onSubmit into an action, but that requires implementation on the backend
            which we do not yet have */}
            <form onSubmit={handleSubmit}>
                <label htmlFor="reg-username">Username:</label>
                <input
                type="text"
                id="reg-username"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                /><br/>
                <label htmlFor="reg-password">Password:</label>
                <input
                type="password"
                id="reg-password"
                value={passInput}
                onChange={(e) => setPassInput(e.target.value)}
                /><br/>
                <button>Register Here!</button>
            </form>
            <p>{error}</p>
        </div>
    );
}