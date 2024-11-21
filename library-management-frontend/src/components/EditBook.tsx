import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBook, updateBook } from "../services/bookService";

const EditBook: React.FC = () => {
  const { id } = useParams(); // Extract book ID from the URL
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false); // State to control the dialog open/close
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const book = await getBook(Number(id)); // Use getBook with the ID
        if (book) {
          setTitle(book.title);
          setAuthor(book.author);
          setDescription(book.description);
          setOpen(true); // Open the dialog when the book is fetched
        }
      } catch (error) {
        setError("Failed to fetch book details");
      }
    };

    fetchBook();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !author || !description) {
      setError("Please fill in all fields");
      return;
    }

    try {
      // Include 'id' in the object passed to updateBook
      await updateBook(Number(id), {
        id: Number(id),
        title,
        author,
        description,
      });
      setOpen(false); // Close the dialog after success
      navigate("/"); // Redirect to book list
    } catch (err) {
      setError("Failed to update book");
    }
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog when Cancel is clicked
    navigate("/"); // Redirect to book list after closing the dialog
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-container">
        <div className="dialog-header">
          <div className="dialog-icon">🔲</div>
          <h1 className="dialog-title">Edit Book (ID: {id})</h1>
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
              Update Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
