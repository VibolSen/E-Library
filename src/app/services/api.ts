import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// --- DATA MODELS ---

// Interface for a Category object, matching your API's structure
export interface Category {
  id: number;
  name: string;
}

// Interface for a Book object, matching your API's structure
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
  // REMOVE THIS LINE: category?: Category | null;
  // ADD THIS LINE:
  categoryName?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  // The base URL for your e-library API
  private baseUrl = 'http://localhost:5069/api/e-library';

  constructor() {}

  // --- Book / Resource Methods ---

  // GET /api/e-library/resources
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/resources`);
  }

  // GET /api/e-library/resources/{id}
  getBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/resources/${bookId}`);
  }

  // POST /api/e-library/resources
  createBook(bookData: Book): Observable<Book> {
    return this.http.post<Book>(`${this.baseUrl}/resources`, bookData);
  }

  // PUT /api/e-library/resources/{id}
  updateBook(bookId: number, bookData: Book): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/resources/${bookId}`, bookData);
  }

  // DELETE /api/e-library/resources/{id}
  deleteBook(bookId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/resources/${bookId}`);
  }

  // --- Category Methods ---

  // GET /api/e-library/categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  // GET /api/e-library/categories/{id}
  getCategoryById(categoryId: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/categories/${categoryId}`);
  }

  // POST /api/e-library/categories
  createCategory(categoryData: Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/categories`, categoryData);
  }

  // PUT /api/e-library/categories/{id}
  updateCategory(categoryId: number, categoryData: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/categories/${categoryId}`, categoryData);
  }

  // DELETE /api/e-library/categories/{id}
  deleteCategory(categoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/categories/${categoryId}`);
  }
}
