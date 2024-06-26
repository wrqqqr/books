import React from "react";
import { Grid } from "@mui/material";
import BookCard from "../BookCard/BookCard";

const BooksGrid = ({ books }) => {
  return (
    <Grid container spacing={2} marginTop={2}>
      {books?.map((book) => {
        const { title, authors, description, imageLinks } = book.volumeInfo;
        const imageUrl =
          imageLinks && imageLinks.thumbnail
            ? imageLinks.thumbnail
            : "/images/default-image.png"; // Путь к изображению по умолчанию

        return (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <BookCard
              title={title}
              authors={authors}
              description={description}
              imageUrl={imageUrl}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default BooksGrid;