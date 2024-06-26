"use client";

import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import {
  TextField,
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

const defaultImage = "./default-image.jpg";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const [query, setQuery] = useState("Lovecraft");
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBooks = useCallback(async (query: string, startIndex = 0) => {
    if (query.length === 0) {
      setBooks([]);
      return;
    }
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
    let response = null;
    try {
      response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=6&key=${apiKey}`,
      );
    } catch (error) {
      console.error("Ошибка при запросе книг:", error);
    }
    setBooks(response?.data.items || []);
    setTotalPages(Math.ceil(response?.data.totalItems / 12));
  }, []);

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
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} marginTop={2}>
        {books.map((book) => {
          const { title, authors, description, imageLinks } = book.volumeInfo;
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
                      image={imageLinks?.thumbnail || defaultImage}
                      title={title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultImage;
                      }}
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
