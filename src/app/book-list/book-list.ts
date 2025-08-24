import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService, Book } from '../services/api'; // Import from ApiService
import { SpinnerComponent } from '../shared/spinner/spinner';
import { BookCardComponent } from '../book-card/book-card';
import { SearchFilterPipe } from './search-filter.pipe';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    SpinnerComponent,
    BookCardComponent,
    SearchFilterPipe,
  ],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  searchTerm: string = '';
  isLoading: boolean = true;
  error: string | null = null;

  private apiService = inject(ApiService);

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.isLoading = true;
    this.error = null;
    this.apiService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load books. The API server may be unavailable.';
        console.error(err);
        this.isLoading = false;
      },
    });
  }
}
