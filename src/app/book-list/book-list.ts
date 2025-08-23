import { Component, OnInit } from '@angular/core'; // <-- 1. Import OnInit
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { of } from 'rxjs'; // <-- 2. Import RxJS 'of'
import { delay } from 'rxjs/operators'; // <-- 3. Import RxJS 'delay'
import { BOOKS } from '../mock-books';
import { BookCardComponent } from '../book-card/book-card';
import { SearchFilterPipe } from './search-filter.pipe';
import { SpinnerComponent } from '../shared/spinner/spinner'; // <-- 4. Import SpinnerComponent

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    BookCardComponent,
    FormsModule,
    SearchFilterPipe,
    RouterLink,
    SpinnerComponent, // <-- 5. Add SpinnerComponent to imports
  ],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookListComponent implements OnInit {
  // <-- 6. Implement OnInit
  books = BOOKS;
  searchTerm: string = '';
  isLoading: boolean = true; // <-- 7. Add isLoading property

  ngOnInit(): void {
    // Simulate a 1-second network delay
    of(null)
      .pipe(delay(1000))
      .subscribe(() => {
        this.isLoading = false; // <-- After 1 second, set isLoading to false
      });
  }
}
