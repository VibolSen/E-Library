import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../mock-books'; // Import the Book interface

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css',
})
export class BookCardComponent {
  @Input() book!: Book; // This allows a parent component to pass a 'book' object to this component
}
