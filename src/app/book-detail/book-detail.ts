import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService, Book } from '../services/api'; // <-- 1. Import from ApiService
import { SpinnerComponent } from '../shared/spinner/spinner'; // <-- 2. Import Spinner

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, SpinnerComponent], // <-- 3. Add SpinnerComponent
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css',
})
export class BookDetailComponent implements OnInit {
  book: Book | undefined;
  isLoading: boolean = true;
  error: string | null = null;

  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService); // <-- 4. Inject ApiService

  ngOnInit(): void {
    // Get the book ID from the URL
    const bookId = this.route.snapshot.paramMap.get('id');

    if (bookId) {
      this.isLoading = true;
      this.error = null;
      // Fetch the single book from the API
      this.apiService.getBookById(+bookId).subscribe({
        next: (data) => {
          this.book = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Failed to load book details.';
          console.error(err);
          this.isLoading = false;
        },
      });
    } else {
      // Handle the case where no ID is provided in the URL
      this.isLoading = false;
      this.error = 'No book ID provided.';
    }
  }
}
