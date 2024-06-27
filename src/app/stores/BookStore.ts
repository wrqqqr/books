// stores/BookStore.ts
import { makeAutoObservable, runInAction } from "mobx";
import { fetchBooks } from "@/app/lib/api/fetchBooks";
import { Book } from "@/app/types";

class BookStore {
  query = "Lovecraft";
  currentPage = 1;
  selectedGenre = "";
  books: Book[] = [];
  totalItems = 0;
  loading = false;
  ITEMS_PER_PAGE = 6;

  constructor() {
    makeAutoObservable(this);
    this.fetchBooks();
  }

  setQuery(query: string) {
    this.query = query;
    this.currentPage = 1;
    this.fetchBooks();
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
    this.fetchBooks();
  }

  setSelectedGenre(genre: string) {
    this.selectedGenre = genre;
    this.currentPage = 1;
    this.fetchBooks();
  }

  async fetchBooks() {
    this.loading = true;
    const startIndex = (this.currentPage - 1) * this.ITEMS_PER_PAGE;
    let searchQuery = this.query;
    if (this.selectedGenre) {
      searchQuery += `+subject:${this.selectedGenre}`;
    }
    const { books, totalItems } = await fetchBooks(
      searchQuery,
      startIndex,
      this.ITEMS_PER_PAGE,
    );

    runInAction(() => {
      this.books = books;
      this.totalItems = totalItems;
      this.loading = false;
    });
  }
}

const bookStore = new BookStore();
export default bookStore;
