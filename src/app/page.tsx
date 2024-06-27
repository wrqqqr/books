"use client";

import React, { useState, useCallback, useEffect } from "react";
import { observer } from "mobx-react-lite";
import debounce from "lodash.debounce";
import { Container, Box, Grid, Skeleton } from "@mui/material";
import SearchBar from "./ui/SearchBar/SearchBar";
import BooksGrid from "./ui/BooksGrid/BooksGrid";
import PaginationControls from "./ui/PaginationControls/PaginationControls";
import bookStore from "@/app/stores/BookStore";
import GenreSelect from "@/app/ui/GenreSelect/GenreSelect";

const HomePage: React.FC = observer(() => {
  useEffect(() => {
    bookStore.fetchBooks();
  }, []);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    bookStore.setCurrentPage(value);
  };

  const skeletonItems = Array.from(new Array(3)).map((_, index) => (
    <Grid item xs={12} sm={6} md={4} key={index}>
      <Skeleton variant="rectangular" height={200} />
      <Skeleton height={40} />
      <Skeleton height={30} />
      <Skeleton height={20} />
    </Grid>
  ));

  return (
    <Container>
      <GenreSelect
        selectedGenre={bookStore.selectedGenre}
        setSelectedGenre={(genre) => bookStore.setSelectedGenre(genre)}
      />
      <SearchBar
        query={bookStore.query}
        setQuery={(query) => bookStore.setQuery(query)}
      />
      {bookStore.loading ? (
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <Grid container spacing={3}>
            {skeletonItems}
          </Grid>
        </Box>
      ) : (
        <BooksGrid books={bookStore.books} />
      )}
      <PaginationControls
        totalPages={bookStore.totalItems}
        currentPage={bookStore.currentPage}
        handlePageChange={handlePageChange}
      />
    </Container>
  );
});

export default HomePage;
