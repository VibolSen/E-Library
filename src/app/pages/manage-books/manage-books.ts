import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book, BOOKS } from '../../mock-books';
import { ModalService } from '../../shared/modal.service';

// --- PrimeNG Imports ---
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
// -----------------------

@Component({
  selector: 'app-manage-books',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    // --- Add PrimeNG Modules here ---
    TableModule,
    ButtonModule,
    // --------------------------------
  ],
  templateUrl: './manage-books.html',
  styleUrl: './manage-books.css',
})
export class ManageBooksComponent implements OnDestroy {
  books: Book[] = BOOKS;
  modalService = inject(ModalService);
  private modalSubscription: Subscription;

  constructor() {
    this.modalSubscription = this.modalService.userChoice$.subscribe((choice) => {
      if (choice && this.bookToDeleteId !== null) {
        this.confirmDelete(this.bookToDeleteId);
      }
      this.bookToDeleteId = null;
    });
  }

  private bookToDeleteId: number | null = null;

  deleteBook(bookId: number, bookTitle: string): void {
    this.bookToDeleteId = bookId;
    this.modalService.open(
      `Are you sure you want to delete "${bookTitle}"? This action cannot be undone.`
    );
  }

  private confirmDelete(bookId: number): void {
    const index = this.books.findIndex((book) => book.id === bookId);
    if (index !== -1) {
      this.books.splice(index, 1);
    }
  }

  ngOnDestroy(): void {
    this.modalSubscription.unsubscribe();
  }
}
