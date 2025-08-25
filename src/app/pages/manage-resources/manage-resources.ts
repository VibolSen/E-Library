import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService, Resource } from '../../services/api';
import { ModalService } from '../../shared/modal.service';
import { ToastService } from '../../shared/toast.service';
import { SpinnerComponent } from '../../shared/spinner/spinner';

@Component({
  selector: 'app-manage-resources',
  standalone: true,
  imports: [CommonModule, RouterLink, SpinnerComponent],
  templateUrl: './manage-resources.html',
  styleUrl: './manage-resources.css',
})
export class ManageResourcesComponent implements OnInit, OnDestroy {
  resources: Resource[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  private apiService = inject(ApiService);
  private modalService = inject(ModalService);
  private toastService = inject(ToastService);
  private modalSubscription!: Subscription;

  ngOnInit(): void {
    this.loadResources();
    this.modalSubscription = this.modalService.userChoice$.subscribe((choice) => {
      if (choice && this.resourceToDeleteId !== null) {
        this.confirmDelete(this.resourceToDeleteId);
      }
      this.resourceToDeleteId = null;
    });
  }

  loadResources(): void {
    this.isLoading = true;
    this.error = null;
    this.apiService.getResources().subscribe({
      next: (data) => {
        // Filter out the books (assuming books have a specific ResourceType, e.g., 0)
        // Adjust this logic based on your API's ResourceType enum/values
        this.resources = data.filter((res) => (res as any).resourceType !== 0);
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load resources.';
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  private resourceToDeleteId: number | null = null;

  deleteResource(resourceId: number, resourceTitle: string): void {
    this.resourceToDeleteId = resourceId;
    this.modalService.open(`Are you sure you want to delete "${resourceTitle}"?`);
  }

  private confirmDelete(resourceId: number): void {
    // This line calls the method we just added to the service
    this.apiService.deleteResource(resourceId).subscribe({
      next: () => {
        this.toastService.show('Resource deleted successfully!');
        this.loadResources(); // Refresh list
      },
      error: (err) => {
        this.toastService.show('Failed to delete resource.', 'error');
        console.error(err);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }
  }
}
