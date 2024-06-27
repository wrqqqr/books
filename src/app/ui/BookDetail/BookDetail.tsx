"use client";

import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { Book } from "@/app/types";

const defaultImage = "/default-image.jpg";

interface BookDetailProps {
  book: Book;
}

const BookDetail: React.FC<BookDetailProps> = ({ book }) => {
  const {
    title,
    authors,
    description,
    imageLinks,
    publisher,
    publishedDate,
    pageCount,
    categories,
  } = book.volumeInfo;

  return (
    <Card>
      {imageLinks && imageLinks.thumbnail && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 300,
            overflow: "hidden",
          }}
        >
          <CardMedia
            component="img"
            sx={{ height: "100%", width: "auto", objectFit: "contain" }}
            alt={title}
            image={imageLinks.thumbnail || defaultImage}
            title={title}
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = defaultImage;
            }}
          />
        </Box>
      )}
      <CardContent>
        <Typography variant="h4" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="h6"
          color="textSecondary"
          component="div"
          gutterBottom
        >
          {authors?.join(", ")}
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          component="div"
          gutterBottom
        >
          <strong>Publisher:</strong> {publisher}
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          component="div"
          gutterBottom
        >
          <strong>Published Date:</strong> {publishedDate}
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          component="div"
          gutterBottom
        >
          <strong>Page Count:</strong> {pageCount}
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          component="div"
          gutterBottom
        >
          <strong>Categories:</strong> {categories?.join(", ")}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="div"
          dangerouslySetInnerHTML={{ __html: description }}
        ></Typography>
      </CardContent>
    </Card>
  );
};

export default BookDetail;
