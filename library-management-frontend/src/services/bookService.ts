import axios from 'axios';

// Base URL for the API
const API_BASE_URL = 'http://localhost:5223/api/Books';

// Axios Interceptor for error handling (consolidated)
axios.interceptors.response.use(
    response => response, // Return response as is if no error
    error => {
        // Log the error details
        console.error('Axios Error:', error.response || error.message);

        // Handle validation errors
        if (error.response?.data?.errors) {
            const errorMessages = Object.values(error.response.data.errors).flat().join('\n');
            alert(`Validation Errors:\n${errorMessages}`);
        } else {
            alert('An error occurred. Please try again.');
        }

        return Promise.reject(error); // Always reject the error so the caller can handle it
    }
);

/**
 * Fetch all books from the API.
 * @returns {Promise<any[]>} List of books
 */
export const getBooks = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
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
        const response = await axios.get(`${API_BASE_URL}/${id}`); // Ensure the endpoint is correct
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch book with ID ${id}:`, error);
        throw error;
    }
};

/**
 * Add a new book via the API.
 * @param {{ title: string; author: string; description: string }} book - Book details to add
 * @returns {Promise<any>} Newly created book details
 */
export const addBook = async (book: { title: string; author: string; description: string }) => {
    try {
        const response = await axios.post(API_BASE_URL, book);
        return response.data;
    } catch (error) {
        console.error('Failed to add book:', error);
        throw error;
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
        const response = await axios.put(`${API_BASE_URL}/${id}`, book);
        return response.data;
    } catch (error) {
        console.error(`Failed to update book with ID ${id}:`, error);
        throw error;
    }
};

/**
 * Delete a book via the API.
 * @param {number} id - ID of the book to delete
 * @returns {Promise<void>}
 */
export const deleteBook = async (id: number) => {
    try {
        await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
        console.error(`Failed to delete book with ID ${id}:`, error);
        throw error;
    }
};
