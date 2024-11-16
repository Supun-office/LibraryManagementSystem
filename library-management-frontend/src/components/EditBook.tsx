import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById, updateBook } from '../services/bookService';

const EditBook: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch the book details to pre-fill the form
        const fetchBook = async () => {
            if (id) {
                try {
                    const book = await getBookById(parseInt(id));
                    setTitle(book.title);
                    setAuthor(book.author);
                    setDescription(book.description);
                } catch (error) {
                    console.error('Error fetching book:', error);
                }
            }
        };

        fetchBook();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const updatedBook = { id: parseInt(id!), title, author, description };
            await updateBook(updatedBook);
            setMessage('Book updated successfully!');
            navigate('/'); // Redirect to the book list
        } catch (error) {
            console.error(error);
            setMessage('Failed to update the book. Please try again.');
        }
    };

    return (
        <div>
            <h2>Edit Book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Author:</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Update Book</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default EditBook;
