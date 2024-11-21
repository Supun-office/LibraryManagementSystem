// services/authService.ts
import axios from 'axios'; // Import axios to make HTTP requests

// Define the API URL where authentication-related endpoints are located
const API_URL = 'http://localhost:5223/api/auth'; 

// Login Function
export const loginUser = async (username: string, password: string, credentials: { username: string; password: string; }) => {
    try {
        // Make a POST request to the '/login' endpoint with the credentials
        const response = await axios.post(`${API_URL}/login`, credentials);

        // If successful, return the JWT token from the response data
        return response.data.token; 
    } catch (error: any) {
        // If there's an error, throw a new error with the error message or a default message
        throw new Error(error.response?.data?.message || 'Login failed. Please try again.');
    }
};

// Register Function
export const registerUser = async (credentials: { username: string; password: string; confirmPassword: string }) => {
    try {
        // Make a POST request to the '/register' endpoint with the user's credentials
        const response = await axios.post(`${API_URL}/register`, credentials);

        // Return the server response (e.g., success message or user data)
        return response.data; 
    } catch (error: any) {
        // If there's an error, throw a new error with the error message or a default message
        throw new Error(error.response?.data?.message || 'Registration failed. Please try again.');
    }
};
