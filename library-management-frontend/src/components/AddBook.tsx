import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addBook } from '../services/bookService';

const AddBook: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
    });
    const [errors, setErrors] = useState({
        title: '',
        author: '',
        description: '',
    });

    const validateForm = () => {
        const newErrors = { title: '', author: '', description: '' };
        if (!formData.title.trim()) newErrors.title = 'Title is required.';
        if (!formData.author.trim()) newErrors.author = 'Author is required.';
        if (!formData.description.trim()) newErrors.description = 'Description is required.';
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await addBook(formData);
            alert('Book added successfully!');
            navigate('/');
        } catch (error) {
            alert('Failed to add the book. Please try again.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div>
            <h2>Add Book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
                </div>
                <div>
                    <label>Author:</label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                    />
                    {errors.author && <p style={{ color: 'red' }}>{errors.author}</p>}
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}
                </div>
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
};

export default AddBook;
