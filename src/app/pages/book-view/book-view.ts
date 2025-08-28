import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService, Book } from '../../services/api';
import { SpinnerComponent } from '../../shared/spinner/spinner';
import { ImageUrlPipe } from '../../shared/pipes/image-url-pipe';

@Component({
  selector: 'app-book-view',
  standalone: true,
  imports: [CommonModule, RouterLink, SpinnerComponent, ImageUrlPipe],
  templateUrl: './book-view.html',
  styleUrl: './book-view.css',
})
export class BookViewComponent implements OnInit {
  book: Book | null = null;
  isLoading: boolean = true;
  error: string | null = null;

  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
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
    }
  }
}
