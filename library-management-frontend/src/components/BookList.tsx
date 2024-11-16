import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBooks, deleteBook } from '../services/bookService';

const BookList: React.FC = () => {
    const [books, setBooks] = useState<any[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const books = await getBooks();
            setBooks(books);
        };

        fetchBooks();
    }, []);

    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this book?");
        if (!confirmDelete) return;

        try {
            await deleteBook(id);
            setBooks(books.filter(book => book.id !== id)); // Update the state after successful deletion
            alert('Book deleted successfully!');
        } catch (error) {
            console.error('Failed to delete book:', error);
            alert('Failed to delete the book. Please try again.');
        }
    };

    return (
        <div>
            <h2>Book List</h2>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <strong>{book.title}</strong> by {book.author}
                        <div>
                            <Link to={`/edit-book/${book.id}`}>Edit</Link>
                            <button onClick={() => handleDelete(book.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
