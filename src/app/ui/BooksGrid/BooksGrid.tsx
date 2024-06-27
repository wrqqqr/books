"use client";

import React from "react";
import Link from "next/link";
import { Grid } from "@mui/material";
import BookCard from "../BookCard/BookCard";
import { Book } from "@/app/types";

interface BooksGridProps {
  books: Book[];
}

const BooksGrid: React.FC<BooksGridProps> = ({ books }) => {
  return (
    <Grid container spacing={2} marginTop={2}>
      {books?.map((book) => {
        const { title, authors, description, imageLinks } = book.volumeInfo;
        const imageUrl = imageLinks?.thumbnail || "/images/default-image.png";

        return (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Link href={`/book/${book.id}`} passHref>
              <BookCard
                title={title}
                authors={authors}
                description={description}
                imageUrl={imageUrl}
              />
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default BooksGrid;
