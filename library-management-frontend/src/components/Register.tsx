
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import '../index.css';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await registerUser({ username, password, confirmPassword });
            setSuccess('Registration successful. Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err: any) {
            setError(err.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="register-page-container">
            <div className="register-page-left">
                <img src="/logo.png" alt="BookWorm Logo" className="register-page-logo" />
                <h1 className="register-page-title">BookWorm</h1>
                <p className="register-page-signin-text">Already have an account? Sign In now.</p>
                <Link to="/login">
                    <button className="register-page-signin-button">Sign In</button>
                </Link>
            </div>
            <div className="register-page-right">
                <h1 className="register-page-signup-title">Sign Up</h1>
                <p className="register-page-subtitle">Please provide your information to sign up.</p>
                {error && <p className="register-page-error">{error}</p>}
                {success && <p className="register-page-success">{success}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    className="register-page-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="register-page-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="register-page-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button className="register-page-button" onClick={handleRegister}>
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default Register;
