import axios from 'axios';

// Base URL for the API
const API_BASE_URL = 'http://localhost:5223/api/Books';

// Axios Interceptor for error handling
axios.interceptors.response.use(
    response => response,
    error => {
        console.error('Axios Error:', error.response || error.message);
        return Promise.reject(error);
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
        throw error;
    }
};

/**
 * Fetch a single book by ID from the API.
 * @param {number} id - ID of the book to fetch
 * @returns {Promise<any>} Book details
 */
export const getBookById = async (id: number) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
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
 * @param {{ id: number; title: string; author: string; description: string }} book - Book details to update
 * @returns {Promise<any>} Updated book details
 */
export const updateBook = async (book: { id: number; title: string; author: string; description: string }) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${book.id}`, book);
        return response.data;
    } catch (error) {
        console.error(`Failed to update book with ID ${book.id}:`, error);
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

 // handle backend validation errors
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.data?.errors) {
            const errorMessages = Object.values(error.response.data.errors).flat().join('\n');
            alert(`Validation Errors:\n${errorMessages}`);
        } else {
            alert('An error occurred. Please try again.');
        }
        return Promise.reject(error);
    }
);
