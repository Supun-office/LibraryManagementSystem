import React, { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../services/bookService";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import "../index.css"; // Import the custom CSS

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };
    fetchBooks();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteBook(id);
      setBooks(books.filter((book: any) => book.id !== id));
    } catch (error) {
      console.error(`Failed to delete book with ID ${id}:`, error);
    }
  };

  return (
    <Box className="booklist-container">
      {/* Add Book Button */}
      <Box className="add-book-button-container">
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/add-book"
          className="add-book-button"
        >
          Add Book
        </Button>
      </Box>

      {/* Book Cards Section */}
      <Box className="book-cards-container">
        <Typography variant="h4" className="book-list-heading">
          Books
        </Typography>
        <Grid container spacing={3} justifyContent="flex-start">
          {books.map((book: any) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={book.id}
              className="book-card-item"
            >
              <Card className="book-card">
                <CardContent>
                  {/* Book Title */}
                  <Typography variant="h5" className="book-title">
                    {book.title}
                  </Typography>
                  {/* Book Author */}
                  <Typography color="text.secondary" className="book-author">
                    {book.author}
                  </Typography>
                  {/* Book Description */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="book-description"
                  >
                    {book.description}
                  </Typography>
                  {/* Edit and Delete Buttons */}
                  <Box className="book-card-actions">
                    <Button
                      component={Link}
                      to={`/edit-book/${book.id}`}
                      variant="contained"
                      color="primary"
                      size="small"
                      className="edit-button"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(book.id)}
                      className="delete-button"
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default BookList;
