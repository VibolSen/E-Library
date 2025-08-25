import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, PerformanceMetrics, Resource } from '../../services/api';
import { SpinnerComponent } from '../../shared/spinner/spinner';
import { forkJoin } from 'rxjs'; // We'll use forkJoin to run API calls in parallel

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class ReportsComponent implements OnInit {
  isLoading: boolean = true;
  error: string | null = null;

  // Properties to hold our report data
  metrics: PerformanceMetrics | null = null;
  recentUploads: Resource[] = [];

  private apiService = inject(ApiService);

  ngOnInit(): void {
    this.loadAllReports();
  }

  loadAllReports(): void {
    this.isLoading = true;
    this.error = null;

    // Use forkJoin to wait for both API calls to complete
    forkJoin({
      metrics: this.apiService.getPerformanceMetrics(),
      recentUploads: this.apiService.getRecentUploads(),
    }).subscribe({
      next: (data) => {
        this.metrics = data.metrics;
        this.recentUploads = data.recentUploads;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load report data from the API.';
        console.error(err);
        this.isLoading = false;
      },
    });
  }
}
