// lib/hooks/useFetchBooks.ts
import { useState, useCallback } from "react";
import axios from "axios";

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    description: string;
    imageLinks: { thumbnail: string };
  };
}

const useFetchBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalItems, setTotalItems] = useState<number>(0);

  const fetchBooks = useCallback(
    async (query: string, startIndex: number = 0, maxResults: number = 3) => {
      setLoading(true);
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=3&key=${apiKey}`,
        );
        setBooks(response.data.items || []);
        setTotalItems(response.data.totalItems);
      } catch (error) {
        console.error("Ошибка при запросе книг:", error);
        setBooks([]);
        setTotalItems(0);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { books, loading, totalItems, fetchBooks };
};

export default useFetchBooks;
