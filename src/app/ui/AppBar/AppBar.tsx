"use client";

import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import {
  CircularProgress,
  InputBase,
  Toolbar,
  Box,
  AppBar,
  Grid,
  Typography,
  Pagination,
  Card,
  CardContent,
  CardMedia,
  Container,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import debounce from "lodash.debounce";
import SearchBar from "@/app/ui/SearchBar/SearchBar";

const defaultImage = "/images/default-image.png";

export default function SearchAppBar() {
  const [query, setQuery] = useState("Lovecraft");
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedFetchBooks = useCallback(
    debounce((q) => fetchBooks(q), 500),
    [fetchBooks],
  );

  useEffect(() => {
    debouncedFetchBooks(query);
  }, [query, debouncedFetchBooks]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    fetchBooks(query, (value - 1) * 12);
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Books search
          </Typography>
          <SearchBar onSearch={fetchBooks} />
        </Toolbar>
      </AppBar>
      {isLoading ? (
        <Box display="flex" justifyContent="center" marginTop={2}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2} marginTop={2}>
          {books.map((book) => {
            const { title, authors, description, imageLinks } = book.volumeInfo;
            const imageUrl =
              imageLinks && imageLinks.thumbnail
                ? imageLinks.thumbnail
                : defaultImage;
            return (
              <Grid item xs={12} sm={6} md={4} key={book.id}>
                <Card>
                  {imageLinks && imageLinks.thumbnail && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 200,
                        overflow: "hidden",
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          height: "100%",
                          width: "auto",
                          objectFit: "contain",
                        }}
                        alt={title}
                        image={imageUrl}
                        title={title}
                      />
                    </Box>
                  )}
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {title}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      component="div"
                    >
                      {authors?.join(", ")}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {description?.substring(0, 100)}...
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" marginTop={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
}
