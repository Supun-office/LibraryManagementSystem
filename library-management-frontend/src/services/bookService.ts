import axios from 'axios'; // Import axios for making HTTP requests

// Base URL for the API
const API_BASE_URL = 'http://localhost:5223/api/Books'; // The endpoint to manage books

// Axios Interceptor for error handling (consolidated)
axios.interceptors.response.use(
    response => response, // If no error, just return the response as is
    error => {
        // Log the error details for debugging purposes
        console.error('Axios Error:', error.response || error.message);

        // Handle validation errors, which are common in form submissions
        if (error.response?.data?.errors) {
            const errorMessages = Object.values(error.response.data.errors).flat().join('\n');
            alert(`Validation Errors:\n${errorMessages}`);
        } else {
            alert('An error occurred. Please try again.'); // General error message
        }

        return Promise.reject(error); // Always reject the error so the calling component can handle it
    }
);

/**
 * Fetch all books from the API.
 * @returns {Promise<any[]>} List of books
 */
export const getBooks = async () => {
    try {
        // Send GET request to fetch all books
        const response = await axios.get(API_BASE_URL);
        return response.data; // Return the list of books
    } catch (error) {
        // Log error if the API call fails
        console.error('Failed to fetch books:', error);
        throw error;  // Rethrow the error so the calling component can handle it
    }
};

/**
 * Fetch a specific book by ID.
 * @param {number} id - The ID of the book to fetch.
 * @returns {Promise<any>} - The fetched book data.
 */
export const getBook = async (id: number) => {
    try {
        // Send GET request to fetch a specific book by its ID
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data; // Return the data of the specific book
    } catch (error) {
        // Log error if the API call fails
        console.error(`Failed to fetch book with ID ${id}:`, error);
        throw error; // Rethrow the error for handling in the calling component
    }
};

/**
 * Add a new book via the API.
 * @param {{ title: string; author: string; description: string }} book - Book details to add
 * @returns {Promise<any>} Newly created book details
 */
export const addBook = async (book: { title: string; author: string; description: string }) => {
    try {
        // Send POST request to add a new book
        const response = await axios.post(API_BASE_URL, book);
        return response.data; // Return the details of the newly created book
    } catch (error) {
        // Log error if the API call fails
        console.error('Failed to add book:', error);
        throw error; // Rethrow the error for handling in the calling component
    }
};

/**
 * Update an existing book via the API.
 * @param {number} id - The ID of the book to update.
 * @param {object} book - The updated book details including title, author, and description.
 * @returns {Promise<any>} - The updated book details returned from the API.
 */
export const updateBook = async (id: number, book: { id: number; title: string; author: string; description: string }) => {
    try {
        // Send PUT request to update an existing book
        const response = await axios.put(`${API_BASE_URL}/${id}`, book);
        return response.data; // Return the updated book details
    } catch (error) {
        // Log error if the API call fails
        console.error(`Failed to update book with ID ${id}:`, error);
        throw error; // Rethrow the error for handling in the calling component
    }
};

/**
 * Delete a book via the API.
 * @param {number} id - ID of the book to delete
 * @returns {Promise<void>} - Void, no data returned
 */
export const deleteBook = async (id: number) => {
    try {
        // Send DELETE request to remove a book by its ID
        await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
        // Log error if the API call fails
        console.error(`Failed to delete book with ID ${id}:`, error);
        throw error; // Rethrow the error for handling in the calling component
    }
};
