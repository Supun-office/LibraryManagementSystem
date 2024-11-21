import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import "../index.css";

const Register: React.FC = () => {
  const [username, setUsername] = useState(""); // State for the username input
  const [password, setPassword] = useState(""); // State for the password input
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirming the password
  const [error, setError] = useState(""); // State to manage error messages
  const [success, setSuccess] = useState(""); // State to manage success messages
  const navigate = useNavigate(); // Hook to navigate after successful registration

  // Handle user registration
  const handleRegister = async () => {
    try {
      // Attempt registration with the provided data
      await registerUser({ username, password, confirmPassword });
      setSuccess("Registration successful. Redirecting to login...");

      // Redirect to the login page after success
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      // Display error message if registration fails
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-page-container">
      <div className="register-page-left">
        <h1 className="register-page-title">Book Corner</h1>
        <p className="register-page-signin-text">
          Already have an account? Sign In now.
        </p>
        <Link to="/login">
          <button className="register-page-signin-button">Sign In</button>
        </Link>
      </div>
      <div className="register-page-right">
        <img
          src="../bc.png"
          alt="BookCorner Logo"
          className="register-page-logo"
        />
        <h1 className="register-page-signup-title">Sign Up</h1>
        <p className="register-page-subtitle">
          Please provide your information to sign up.
        </p>
        {error && <p className="register-page-error">{error}</p>}{" "}
        {/* Display error message if any */}
        {success && <p className="register-page-success">{success}</p>}{" "}
        {/* Display success message after registration */}
        <input
          type="text"
          placeholder="Username"
          className="register-page-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Update username state
        />
        <input
          type="password"
          placeholder="Password"
          className="register-page-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="register-page-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword state
        />
        <button className="register-page-button" onClick={handleRegister}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Register;
