import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// --- DATA MODELS ---

export interface CategoryReportData {
  categoryName: string;
  resourceCount: number;
}
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
  private baseUrl = 'http://172.104.190.114/api/e-library';

  constructor() {}

  // --- Book Methods ---
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/resources`);
  }
  getBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/resources/${bookId}`);
  }
  createBook(bookData: Book): Observable<Book> {
    return this.http.post<Book>(`${this.baseUrl}/resources`, bookData);
  }
  updateBook(bookId: number, bookData: Book): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/resources/${bookId}`, bookData);
  }
  deleteBook(bookId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/resources/${bookId}`);
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

  getReportData(): Observable<CategoryReportData[]> {
    return this.http.get<CategoryReportData[]>(`${this.baseUrl}/reports/resources-by-category`);
  }
}
