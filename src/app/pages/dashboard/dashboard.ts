import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Book, Category } from '../../services/api'; // <-- Import from ApiService
// We no longer need mock files

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  totalResources: number = 0;
  totalBooks: number = 0;
  totalPdfs: number = 0; // Will need to adjust based on API data
  totalVideos: number = 0; // Will need to adjust based on API data
  totalCategories: number = 0;

  private apiService = inject(ApiService);

  ngOnInit(): void {
    this.calculateStats();
  }

  calculateStats(): void {
    // Fetch books from the API to get the count
    this.apiService.getBooks().subscribe((books) => {
      // Assuming for now all resources are books
      this.totalBooks = books.length;
      this.totalResources = books.length; // We can make this more complex later
    });

    // Fetch categories from the API to get the count
    this.apiService.getCategories().subscribe((categories) => {
      this.totalCategories = categories.length;
    });
  }
}
