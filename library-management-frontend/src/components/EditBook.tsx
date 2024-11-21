import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBook, updateBook } from "../services/bookService";

const EditBook: React.FC = () => {
  const { id } = useParams(); // Get book ID from the URL
  const [title, setTitle] = useState(""); // Book title state
  const [author, setAuthor] = useState(""); // Book author state
  const [description, setDescription] = useState(""); // Book description state
  const [error, setError] = useState(""); // Error message state
  const [open, setOpen] = useState(false); // Dialog visibility state
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch book details when component mounts
    const fetchBook = async () => {
      try {
        const book = await getBook(Number(id)); // Fetch book by ID
        if (book) {
          setTitle(book.title);
          setAuthor(book.author);
          setDescription(book.description);
          setOpen(true); // Open dialog on successful fetch
        }
      } catch (error) {
        setError("Failed to fetch book details"); // Handle fetch errors
      }
    };

    fetchBook();
  }, [id]); // Dependency ensures fetchBook runs when ID changes

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form behavior
    setError("");

    if (!title || !author || !description) {
      setError("Please fill in all fields"); // Validate inputs
      return;
    }

    try {
      await updateBook(Number(id), {
        id: Number(id),
        title,
        author,
        description,
      }); // Update book
      setOpen(false); // Close dialog on success
      navigate("/"); // Navigate back to book list
    } catch (err) {
      setError("Failed to update book"); // Handle update errors
    }
  };

  const handleClose = () => {
    setOpen(false); // Close dialog
    navigate("/"); // Navigate back to book list
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-container">
        <div className="dialog-header">
          <div className="dialog-icon">🔲</div>
          <h1 className="dialog-title">Edit Book (ID: {id})</h1>{" "}
          {/* Display book ID */}
          <button onClick={handleClose} className="dialog-close">
            ✖
          </button>
        </div>
        <hr className="dialog-divider" />
        <form onSubmit={handleSubmit} className="dialog-form">
          {error && <div className="dialog-error">{error}</div>}{" "}
          {/* Display error */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Update title state
            className="dialog-input"
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)} // Update author state
            className="dialog-input"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)} // Update description state
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
              Update Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
