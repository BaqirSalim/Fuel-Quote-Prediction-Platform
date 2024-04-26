import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import "../styles/registration.css";
import axios from "axios";

export default function Register() {
  const { register } = useAuth();
  const [nameInput, setNameInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // if(nameInput == '' || passInput == '')
    // {
    //     setError("Username or Password empty")
    // }
    // else
    // {
    //     register({ username: nameInput, password: passInput })
    //     setNameInput('')
    //     setPassInput('')
    //     navigate('/login')
    // }

    e.preventDefault();
    const response = await register(nameInput, passInput);

    if (response.success) {
      navigate("/login");
    } else {
      setError(response.error);
    }
  };

  return (
    <div className="registration-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="reg-username"
          placeholder="Username"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          className="username-input" // Apply the CSS class to the username input field
        />
        <br />
        <input
          type="password"
          id="reg-password"
          placeholder="Password"
          value={passInput}
          onChange={(e) => setPassInput(e.target.value)}
        />
        <br />
        <button>Register Here!</button>
      </form>
      <p>{error}</p>
    </div>
  );
}
