import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService, Book } from '../../services/api'; // <-- CORRECTED IMPORT
import { ModalService } from '../../shared/modal.service';
import { SpinnerComponent } from '../../shared/spinner/spinner';
import { ToastService } from '../../shared/toast.service';
import { ImageUrlPipe } from '../../shared/pipes/image-url-pipe';

@Component({
  selector: 'app-manage-books',
  standalone: true,
  imports: [CommonModule, RouterLink, SpinnerComponent, ImageUrlPipe],
  templateUrl: './manage-books.html',
  styleUrl: './manage-books.css',
})
export class ManageBooksComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  private apiService = inject(ApiService);
  private modalService = inject(ModalService);
  private toastService = inject(ToastService);
  private modalSubscription!: Subscription;

  ngOnInit(): void {
    this.loadBooks();
    // Subscribe to modal choices for deletion
    this.modalSubscription = this.modalService.userChoice$.subscribe((choice) => {
      if (choice && this.bookToDeleteId !== null) {
        this.confirmDelete(this.bookToDeleteId);
      }
      this.bookToDeleteId = null;
    });
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
        this.error = 'Failed to load books. Please make sure the API server is running.';
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  private bookToDeleteId: number | null = null;

  deleteBook(bookId: number, bookTitle: string): void {
    this.bookToDeleteId = bookId;
    this.modalService.open(`Are you sure you want to delete "${bookTitle}"?`);
  }

  private confirmDelete(bookId: number): void {
    this.apiService.deleteBook(bookId).subscribe({
      next: () => {
        this.toastService.show('Book deleted successfully!');
        this.loadBooks(); // Refresh the list from the API
      },
      error: (err) => {
        this.toastService.show('Failed to delete book.', 'error');
        console.error(err);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }
  }
}
