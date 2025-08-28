import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService, Resource } from '../../services/api';
import { SpinnerComponent } from '../../shared/spinner/spinner';

@Component({
  selector: 'app-resource-view',
  standalone: true,
  imports: [CommonModule, RouterLink, SpinnerComponent],
  templateUrl: './resource-view.html',
  styleUrl: './resource-view.css',
})
export class ResourceViewComponent implements OnInit {
  resource: Resource | null = null;
  isLoading: boolean = true;
  error: string | null = null;

  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);

  ngOnInit(): void {
    const resourceId = this.route.snapshot.paramMap.get('id');
    if (resourceId) {
      this.apiService.getResourceById(+resourceId).subscribe({
        next: (data) => {
          this.resource = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Failed to load resource details.';
          this.isLoading = false;
        },
      });
    }
  }
}
