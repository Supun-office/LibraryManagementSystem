import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addBook } from "../services/bookService";
import "../index.css";

const AddBook: React.FC = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setOpen(true); // Ensure dialog is open on mount
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form behavior
    setError("");

    if (!title || !author || !description) {
      setError("Please fill in all fields"); // Input validation
      return;
    }

    try {
      await addBook({ title, author, description }); // Add book via service
      navigate("/"); // Navigate to book list
    } catch (err) {
      setError("Failed to add book"); // Handle errors
    }
  };

  const handleClose = () => {
    navigate("/"); // Close dialog and navigate back
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-container">
        <div className="dialog-header">
          <div className="dialog-icon">🔲</div>
          <h1 className="dialog-title">Add New Book</h1>
          <button onClick={handleClose} className="dialog-close">
            ✖
          </button>
        </div>
        <hr className="dialog-divider" />
        <form onSubmit={handleSubmit} className="dialog-form">
          {error && <div className="dialog-error">{error}</div>}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="dialog-input"
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="dialog-input"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="dialog-input dialog-textarea"
          />
          <div className="dialog-actions">
            <button
              type="button"
              onClick={handleClose}
              className="dialog-cancel"
            >
              Cancel
            </button>
            <button type="submit" className="dialog-submit">
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;