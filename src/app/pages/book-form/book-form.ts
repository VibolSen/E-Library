import { Component, inject, OnInit } from '@angular/core'; // <-- 1. Import OnInit
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router'; // <-- 2. Import ActivatedRoute
import { Book, BOOKS } from '../../mock-books';
import { Category, CATEGORIES } from '../../mock-categories';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css',
})
export class BookFormComponent implements OnInit {
  // <-- 3. Implement OnInit
  book: Book = this.getNewBook(); // Initialize with a blank book
  isEditMode: boolean = false;
  categories: Category[] = CATEGORIES;

  // Inject services
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    // Check for an 'id' in the route parameters
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.isEditMode = true;
      const foundBook = BOOKS.find((b) => b.id === +bookId);
      if (foundBook) {
        // IMPORTANT: Create a copy to avoid editing the original object directly
        // This prevents changes from appearing in the table before saving
        this.book = { ...foundBook };
      }
    }
  }

  saveBook(): void {
    if (this.isEditMode) {
      // Find the index of the book to update
      const index = BOOKS.findIndex((b) => b.id === this.book.id);
      if (index !== -1) {
        // Update the book in the main array
        BOOKS[index] = this.book;
      }
    } else {
      // Create a new book (same logic as before)
      this.book.id = Date.now();
      BOOKS.unshift(this.book);
    }
    // Navigate back to the manage books page
    this.router.navigate(['/manage-books']);
  }

  // Helper function to get a new book object
  private getNewBook(): Book {
    return { id: 0, title: '', author: '', coverImage: '', description: '', categoryId: 0 };
  }
}
