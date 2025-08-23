import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BOOKS } from '../../mock-books';
import { RESOURCES } from '../../mock-resources';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  // Properties to hold our calculated stats
  totalResources: number = 0;
  totalBooks: number = 0;
  totalPdfs: number = 0;
  totalVideos: number = 0;
  totalCategories: number = 0; // We'll keep this static for now

  ngOnInit(): void {
    this.calculateStats();
  }

  calculateStats(): void {
    // Count the total number of books
    this.totalBooks = BOOKS.length;

    // Count the resources by type
    this.totalPdfs = RESOURCES.filter((res) => res.type === 'PDF').length;
    this.totalVideos = RESOURCES.filter((res) => res.type === 'Video').length;
    const articleCount = RESOURCES.filter((res) => res.type === 'Article').length;

    // Calculate the grand total
    this.totalResources = this.totalBooks + this.totalPdfs + this.totalVideos + articleCount;

    // For now, we'll just have a static number for categories
    this.totalCategories = 5; // e.g., Fiction, Non-Fiction, Science, History, etc.
  }
}
