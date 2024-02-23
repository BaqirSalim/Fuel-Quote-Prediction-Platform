import React from 'react';
import '../styles/root.css'; // Import the CSS file from the 'styles' folder

export default function Root() {
    return (
        <div className="container">
            <div className="box">
            
                <form>
                    <h2>Welcome!</h2>
                    <div className="textbox">
                        <input type="text" placeholder="Username" />
                    </div>
                    <div className="textbox">
                        <input type="password" placeholder="Password" />
                    </div>
                    <input type="submit" className="loginButton" value="Login" />
                </form>
                <p className="registerText">Don't have an account? <a href="/register">Register here</a></p>
            </div>
        </div>
    );
}
