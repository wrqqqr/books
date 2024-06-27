"use client";

import React, { useState, useCallback, useEffect } from "react";
import debounce from "lodash.debounce";
import { Container, Box, Grid, Skeleton } from "@mui/material";
import SearchBar from "./ui/SearchBar/SearchBar";
import BooksGrid from "./ui/BooksGrid/BooksGrid";
import PaginationControls from "./ui/PaginationControls/PaginationControls";
import useFetchBooks from "@/app/lib/hooks/useFetchBooks";

const ITEMS_PER_PAGE = 4;

const HomePage: React.FC = () => {
  const [query, setQuery] = useState<string>("Lovecraft");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { books, loading, totalItems, fetchBooks } = useFetchBooks();

  const debouncedFetchBooks = useCallback(
    debounce(
      (q: string, startIndex: number) =>
        fetchBooks(q, startIndex, ITEMS_PER_PAGE),
      500,
    ),
    [fetchBooks],
  );

  useEffect(() => {
    if (currentPage === 1) {
      debouncedFetchBooks(query, 0);
    } else {
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      debouncedFetchBooks(query, startIndex);
    }
  }, [query, currentPage, debouncedFetchBooks]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    console.log(value);
    setCurrentPage(value);
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
      <SearchBar query={query} setQuery={setQuery} />
      {loading ? (
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
        <BooksGrid books={books} />
      )}
      <PaginationControls
        totalPages={Math.ceil(totalItems / ITEMS_PER_PAGE)}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </Container>
  );
};

export default HomePage;
