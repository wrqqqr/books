export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    description: string;
    imageLinks?: {
      thumbnail?: string;
    };
    publisher?: string;
    publishedDate?: string;
    pageCount?: number;
    categories?: string[];
  };
}
