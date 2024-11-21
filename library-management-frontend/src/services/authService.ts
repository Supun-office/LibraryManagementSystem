// services/authService.ts
import axios from 'axios';

const API_URL = 'http://localhost:5223/api/auth'; 

// Login Function
export const loginUser = async (credentials: { username: string; password: string }) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data.token; // Return the JWT token
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Login failed. Please try again.');
    }
};

// Register Function
export const registerUser = async (credentials: { username: string; password: string; confirmPassword: string }) => {
    try {
        const response = await axios.post(`${API_URL}/register`, credentials);
        return response.data; // Return server response
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Registration failed. Please try again.');
    }
};
