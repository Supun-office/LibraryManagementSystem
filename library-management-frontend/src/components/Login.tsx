import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Get the login function from AuthContext
import "../index.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth(); // Access the login function from context
  const navigate = useNavigate();

  const handleLogin = () => {
    // Here we don't need to make an API call anymore since there's no token validation
    if (username && password) {
      login(); // Set isAuthenticated to true in the context
      navigate("/"); // Redirect to homepage after successful login
    } else {
      setError("Please enter both username and password");
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-page-left">
        <div className="login-page-logo">
          <img src="/logo.png" alt="BookWorm Logo" /> {/* Update logo path */}
        </div>
        <h1 className="login-page-title">Welcome Back !!</h1>
        <p className="login-page-subtitle">
          Please enter your credentials to log in
        </p>
        {error && <p className="login-page-error">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          className="login-page-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-page-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-page-button" onClick={handleLogin}>
          Sign In
        </button>
      </div>
      <div className="login-page-right">
        <h1 className="login-page-library-title">BookWorm Library</h1>
        <p className="login-page-new-user">New to our platform? Sign Up now.</p>
        <Link to="/register">
          <button className="login-page-signup-button">Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
