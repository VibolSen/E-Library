import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router'; // <-- Corrected: Added RouterLink
import { Book, BOOKS } from '../mock-books';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterLink], // <-- This now works correctly
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css',
})
export class BookDetailComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  book: Book | undefined;

  constructor() {
    const bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.book = BOOKS.find((b) => b.id === bookId);
  }
}
