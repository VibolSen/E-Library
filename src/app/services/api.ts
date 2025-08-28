import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// --- DATA MODELS ---

export interface Category {
  id: number;
  name: string;
}

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
  categoryName?: string | null;
}

export interface Resource {
  id: number;
  title: string;
  author: string | null;
  categoryId: number | null;
  categoryName?: string | null;
  description?: string | null;
  resourceType: number;
  tags?: string | null;
  assetUrl?: string | null;
  coverImageUrl?: string | null;
  publisher?: string | null;
  publishedDate?: Date | null;
}

// --- REPORTING & DASHBOARD INTERFACES ---

// --- THIS INTERFACE WAS MISSING ---
export interface CategoryReportData {
  categoryName: string;
  resourceCount: number;
}
// ------------------------------------

export interface PerformanceMetrics {
  mostViewed: { title: string; viewCount: number }[];
  activeCategories: { categoryName: string; resourceCount: number }[];
  topAuthors: { authorName: string; resourceCount: number }[];
}

export interface DashboardStats {
  totalResources: number;
  totalCategories: number;
  totalBooks: number;
  totalPdfs: number;
  totalVideos: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5069/api/e-library';

  constructor() {}

  // --- Book Methods ---
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/resources`);
  }
  getBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/resources/${bookId}`);
  }
  deleteBook(bookId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/resources/${bookId}`);
  }

  createBook(
    bookData: Book,
    coverImageFile?: File | null,
    ebookFile?: File | null
  ): Observable<Book> {
    const formData = new FormData();
    formData.append('title', bookData.title);
    formData.append('author', bookData.author);
    if (bookData.categoryId) formData.append('categoryId', bookData.categoryId.toString());
    if (bookData.description) formData.append('description', bookData.description);
    if (bookData.publisher) formData.append('publisher', bookData.publisher);
    if (bookData.isbn) formData.append('isbn', bookData.isbn);
    if (bookData.publishedDate)
      formData.append('publishedDate', new Date(bookData.publishedDate).toISOString());
    formData.append('resourceType', '0');
    if (coverImageFile) formData.append('coverImageFile', coverImageFile, coverImageFile.name);
    if (ebookFile) formData.append('assetFile', ebookFile, ebookFile.name);
    return this.http.post<Book>(`${this.baseUrl}/resources`, formData);
  }

  updateBook(
    bookId: number,
    bookData: Book,
    coverImageFile?: File | null,
    ebookFile?: File | null
  ): Observable<Book> {
    const formData = new FormData();
    formData.append('id', bookData.id.toString());
    formData.append('title', bookData.title);
    formData.append('author', bookData.author);
    if (bookData.categoryId) formData.append('categoryId', bookData.categoryId.toString());
    if (bookData.description) formData.append('description', bookData.description);
    if (bookData.publisher) formData.append('publisher', bookData.publisher);
    if (bookData.isbn) formData.append('isbn', bookData.isbn);
    if (bookData.publishedDate)
      formData.append('publishedDate', new Date(bookData.publishedDate).toISOString());
    formData.append('resourceType', '0');
    if (coverImageFile) formData.append('coverImageFile', coverImageFile, coverImageFile.name);
    if (ebookFile) formData.append('assetFile', ebookFile, ebookFile.name);
    return this.http.put<Book>(`${this.baseUrl}/resources/${bookId}`, formData);
  }

  // --- Resource Methods ---
  getResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.baseUrl}/resources`);
  }
  getResourceById(resourceId: number): Observable<Resource> {
    return this.http.get<Resource>(`${this.baseUrl}/resources/${resourceId}`);
  }
  createResource(resourceData: Resource): Observable<Resource> {
    return this.http.post<Resource>(`${this.baseUrl}/resources`, resourceData);
  }
  updateResource(resourceId: number, resourceData: Resource): Observable<Resource> {
    return this.http.put<Resource>(`${this.baseUrl}/resources/${resourceId}`, resourceData);
  }
  deleteResource(resourceId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/resources/${resourceId}`);
  }

  // --- Category Methods ---
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }
  getCategoryById(categoryId: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/categories/${categoryId}`);
  }
  createCategory(categoryData: Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/categories`, categoryData);
  }
  updateCategory(categoryId: number, categoryData: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/categories/${categoryId}`, categoryData);
  }
  deleteCategory(categoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/categories/${categoryId}`);
  }

  // --- Reporting & Dashboard Methods ---
  getPerformanceMetrics(): Observable<PerformanceMetrics> {
    return this.http.get<PerformanceMetrics>(`${this.baseUrl}/reports/performance-metrics`);
  }
  getRecentUploads(): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.baseUrl}/reports/recent-uploads`);
  }
  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.baseUrl}/reports/dashboard-stats`);
  }

  // This method will now work correctly
  getReportData(): Observable<CategoryReportData[]> {
    return this.http.get<CategoryReportData[]>(`${this.baseUrl}/reports/resources-by-category`);
  }
}
