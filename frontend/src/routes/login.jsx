import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/root.css";
import { useAuth } from "../context/authContext";
import image from "../assets/OilFuture.jpg";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(username, password);

    if (response.success) {
      navigate("/profile_form");
    } else {
      setError(response.error);
    }
  };

  return (
    <section class="wrapper">
      <section class="box">
        <section class="text">
          <h2>Welcome</h2>
          <form onSubmit={handleSubmit}>
            <div class="textbox">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div class="textbox">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input type="submit" class="loginButton" value="Login" />
          </form>
          <p class="registerText">
            Don't have an account? <a href="/register">Register here</a>
          </p>
          <p>{error}</p>
        </section>
      </section>

      <section>
        <img src={image} alt="Image" />
      </section>
    </section>
  );
}
