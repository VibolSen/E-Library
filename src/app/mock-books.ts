import { Category } from './services/api'; // <-- Import the Category interface

export interface Book {
  id: number;
  title: string;
  author: string;
  coverImageUrl: string | null;
  description: string | null;
  categoryId: number | null;
  publisher?: string | null;
  publishedDate?: Date | null;
  isbn?: string | null;
  category?: Category | null; // <-- ADD THIS PROPERTY
}
