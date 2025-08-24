import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ApiService, Book, Category } from '../../services/api'; // <-- CORRECTED IMPORT
import { ToastService } from '../../shared/toast.service';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css',
})
export class BookFormComponent implements OnInit {
  book: Book = this.getNewBook();
  isEditMode: boolean = false;
  isLoading: boolean = false;
  categories: Category[] = [];

  // Inject services
  private apiService = inject(ApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toastService = inject(ToastService);

  ngOnInit(): void {
    this.apiService.getCategories().subscribe((cats) => {
      this.categories = cats;
    });

    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.isEditMode = true;
      this.isLoading = true;
      this.apiService.getBookById(+bookId).subscribe((book) => {
        this.book = book;
        this.isLoading = false;
      });
    }
  }

  saveBook(): void {
    this.isLoading = true;
    if (this.isEditMode) {
      this.apiService.updateBook(this.book.id, this.book).subscribe({
        next: () => {
          this.toastService.show('Book updated successfully!');
          this.router.navigate(['/manage-books']);
        },
        error: (err) => {
          this.toastService.show('Failed to update book.', 'error');
          console.error(err);
          this.isLoading = false;
        },
      });
    } else {
      this.apiService.createBook(this.book).subscribe({
        next: () => {
          this.toastService.show('Book created successfully!');
          this.router.navigate(['/manage-books']);
        },
        error: (err) => {
          this.toastService.show('Failed to create book.', 'error');
          console.error(err);
          this.isLoading = false;
        },
      });
    }
  }

  private getNewBook(): Book {
    return {
      id: 0,
      title: '',
      author: '',
      coverImageUrl: null,
      description: null,
      categoryId: null,
      publisher: null,
      publishedDate: null,
      isbn: null,
    };
  }
}
