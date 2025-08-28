import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ApiService, Book, Category } from '../../services/api';
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
  selectedFile: File | null = null;
  selectedEbookFile: File | null = null;

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

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onEbookFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedEbookFile = file;
    }
  }

  saveBook(): void {
    this.isLoading = true;
    if (this.isEditMode) {
      this.apiService
        .updateBook(this.book.id, this.book, this.selectedFile, this.selectedEbookFile)
        .subscribe({
          next: () => {
            this.toastService.show('Book updated successfully!');
            this.router.navigate(['/manage-books']);
          },
          error: (err) => this.handleError('Failed to update book', err),
        });
    } else {
      this.apiService.createBook(this.book, this.selectedFile, this.selectedEbookFile).subscribe({
        next: () => {
          this.toastService.show('Book created successfully!');
          this.router.navigate(['/manage-books']);
        },
        error: (err) => this.handleError('Failed to create book', err),
      });
    }
  }

  private handleError(message: string, error: any) {
    this.toastService.show(message, 'error');
    console.error(error);
    this.isLoading = false;
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
