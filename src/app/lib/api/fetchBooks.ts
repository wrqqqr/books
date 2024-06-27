import axios from "axios";
import { Book } from "@/app/types";

interface FetchBooksResponse {
  books: Book[];
  totalItems: number;
}

export const fetchBooks = async (
  query: string,
  startIndex: number,
  maxResults: number,
): Promise<FetchBooksResponse> => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${maxResults}&key=${apiKey}`,
    );
    return {
      books: response.data.items || [],
      totalItems: response.data.totalItems || 0,
    };
  } catch (error) {
    console.error("Failed to fetch books:", error);
    return {
      books: [],
      totalItems: 0,
    };
  }
};
