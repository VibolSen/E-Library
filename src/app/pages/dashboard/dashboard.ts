import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, DashboardStats } from '../../services/api';
import { SpinnerComponent } from '../../shared/spinner/spinner';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs'; // To run API calls in parallel
// --- Chart Imports ---
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
// -------------------

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, RouterLink, BaseChartDirective], // <-- Add BaseChartDirective
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  isLoading: boolean = true;
  stats: DashboardStats | null = null;
  error: string | null = null;

  private apiService = inject(ApiService);

  // --- Chart Configuration ---
  public pieChartType: ChartType = 'pie';
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: { legend: { position: 'top' } },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [{ data: [] }],
  };
  // -------------------------

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    this.error = null;

    // Use forkJoin to get both stats and chart data at the same time
    forkJoin({
      stats: this.apiService.getDashboardStats(),
      chartData: this.apiService.getReportData(), // Assuming getReportData gets resources by category
    }).subscribe({
      next: ({ stats, chartData }) => {
        // Set stats for the cards
        this.stats = stats;

        // Set data for the chart
        if (chartData && chartData.length > 0) {
          this.pieChartData.labels = chartData.map((item) => item.categoryName);
          this.pieChartData.datasets[0].data = chartData.map((item) => item.resourceCount);
        }

        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load dashboard data.';
        console.error(err);
        this.isLoading = false;
      },
    });
  }
}
