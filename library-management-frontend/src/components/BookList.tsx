import React, { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../services/bookService";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import { MenuBookOutlined } from "@mui/icons-material";

const BookList = () => {
  const [books, setBooks] = useState([]); // State to store the list of books

  useEffect(() => {
    // Fetch books when the component is mounted
    const fetchBooks = async () => {
      try {
        const data = await getBooks(); // Call API to get books
        setBooks(data); // Update state with fetched books
      } catch (error) {
        console.error("Failed to fetch books:", error); // Log fetch errors
      }
    };
    fetchBooks();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteBook(id); // Call API to delete a book
      setBooks(books.filter((book: any) => book.id !== id)); // Update state to remove deleted book
    } catch (error) {
      console.error(`Failed to delete book with ID ${id}:`, error); // Log delete errors
    }
  };

  return (
    <Box
      sx={{
        paddingTop: "80px", // Adjust for navbar height
        margin: 0,
        width: "100%",

        overflow: "hidden",
      }}
    >
      <Stack
        sx={{
          backgroundColor: "black",
          color: "white",
          padding: "15px 0",
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "24px",
          fontWeight: "bold",
          width: "100%",
        }}
      >
        Books
      </Stack>
      <Stack sx={{ display: "flex", direction: "column", gap: "5", px: 10 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "20px",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "#333",
              },
            }}
            component={Link}
            to="/add-book"
          >
            Add Book
          </Button>
        </Box>

        <Grid
          container
          gap={3}
          spacing={3}
          justifyContent="flex-start"
          sx={{ width: "100%" }}
        >
          {books.map((book: any) => (
            <Grid item xs={12} sm={5.5} md={2.5} key={book.id}>
              <Card
                sx={{
                  background: "#f2f2f2",
                  border: "1px solid #000",
                  padding: "15px",
                  width: "100%",
                }}
              >
                <CardContent>
                  <Stack sx={{ display: "flex", spacing: 2, gap: 2 }}>
                    <Box>
                      <MenuBookOutlined sx={{ width: 46, height: 46 }} />
                    </Box>
                    <Typography color="text.secondary" gutterBottom>
                      ID: {book.id} {/* Book ID */}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {book.title} {/* Book Title */}
                    </Typography>
                    <Typography color="text.secondary">
                      Author: {book.author}
                    </Typography>
                    {/* Author */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                    >
                      {book.description} {/* Description */}
                    </Typography>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <Button
                        component={Link}
                        to={`/edit-book/${book.id}`} // Link to edit page
                        variant="contained"
                        sx={{
                          backgroundColor: "black",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#333",
                          },
                        }}
                        size="small"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#d32f2f",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#b71c1c",
                          },
                        }}
                        size="small"
                        onClick={() => handleDelete(book.id)} // Delete book on click
                      >
                        Delete
                      </Button>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
};

export default BookList;
