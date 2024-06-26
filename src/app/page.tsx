"use client";

import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { Container } from "@mui/material";
import SearchBar from "./ui/SearchBar/SearchBar";
import BooksGrid from "./ui/BooksGrid/BooksGrid";
import PaginationControls from "./ui/PaginationControls/PaginationControls";

const HomePage = () => {
  const [query, setQuery] = useState("Lovecraft");
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBooks = useCallback(async (query, startIndex = 0) => {
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
    setTotalPages(Math.ceil(response?.data.totalItems / 6)); // Изменено деление на 6 вместо 12
  }, []);

  const debouncedFetchBooks = useCallback(
    debounce((q, startIndex) => fetchBooks(q, startIndex), 500), // Изменено для принятия второго аргумента
    [fetchBooks],
  );

  useEffect(() => {
    debouncedFetchBooks(query, 1);
  }, [query, debouncedFetchBooks]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    fetchBooks(query, (value - 1) * 6);
  };

  return (
    <Container>
      <SearchBar query={query} setQuery={setQuery} />
      <BooksGrid books={books || []} />{" "}
      {/* Убедитесь, что books всегда массив */}
      <PaginationControls
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </Container>
  );
};

export default HomePage;
