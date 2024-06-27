"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import BookDetail from "../../ui/BookDetail/BookDetail";
import { Container, Typography, Box, Link } from "@mui/material";

const BookPage = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  useEffect(() => {
    if (bookId) {
      const fetchBook = async () => {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`,
        );
        setBook(response.data);
      };

      fetchBook();
    }
  }, [bookId]);

  return (
    <Container>
      <Box>
        <Link href="/">Back</Link>
      </Box>
      {book ? (
        <BookDetail book={book} />
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <Typography variant="h6">Loading...</Typography>
        </Box>
      )}
    </Container>
  );
};

export default BookPage;
