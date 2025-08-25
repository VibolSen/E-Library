import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ApiService, Resource, Category } from '../../services/api';
import { ToastService } from '../../shared/toast.service';

@Component({
  selector: 'app-resource-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './resource-form.html',
  styleUrl: './resource-form.css',
})
export class ResourceFormComponent implements OnInit {
  resource: Resource = this.getNewResource();
  isEditMode: boolean = false;
  isLoading: boolean = false;
  categories: Category[] = [];

  private apiService = inject(ApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toastService = inject(ToastService);

  ngOnInit(): void {
    this.apiService.getCategories().subscribe((cats) => {
      this.categories = cats;
    });

    const resourceId = this.route.snapshot.paramMap.get('id');
    if (resourceId) {
      this.isEditMode = true;
      this.isLoading = true;
      // Note: We need a getResourceById method in the ApiService
      this.apiService.getResourceById(+resourceId).subscribe((res) => {
        this.resource = res;
        this.isLoading = false;
      });
    }
  }

  saveResource() {
    this.isLoading = true;
    // The save logic is complex because the API likely expects different fields for different types.
    // We will need to adjust what we send based on the selected 'resourceType'.
    // For now, this will send the whole object.
    if (this.isEditMode) {
      this.apiService.updateResource(this.resource.id, this.resource).subscribe({
        next: () => {
          this.toastService.show('Resource updated successfully!');
          this.router.navigate(['/manage-resources']);
        },
        error: (err) => {
          this.toastService.show('Failed to update resource.', 'error');
          this.isLoading = false;
        },
      });
    } else {
      this.apiService.createResource(this.resource).subscribe({
        next: () => {
          this.toastService.show('Resource created successfully!');
          this.router.navigate(['/manage-resources']);
        },
        error: (err) => {
          this.toastService.show('Failed to create resource.', 'error');
          this.isLoading = false;
        },
      });
    }
  }

  private getNewResource(): Resource {
    return {
      id: 0,
      title: '',
      author: null,
      categoryId: null,
      description: null,
      resourceType: 1, // Default to PDF (1)
      tags: null,
      assetUrl: null,
      coverImageUrl: null,
      publisher: null,
      publishedDate: null,
    };
  }
}
