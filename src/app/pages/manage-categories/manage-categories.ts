import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService, Category } from '../../services/api'; // Use ApiService
import { ModalService } from '../../shared/modal.service';
import { ToastService } from '../../shared/toast.service';
import { SpinnerComponent } from '../../shared/spinner/spinner';

@Component({
  selector: 'app-manage-categories',
  standalone: true,
  imports: [CommonModule, RouterLink, SpinnerComponent],
  templateUrl: './manage-categories.html',
  styleUrl: './manage-categories.css',
})
export class ManageCategoriesComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  private apiService = inject(ApiService);
  private modalService = inject(ModalService);
  private toastService = inject(ToastService);
  private modalSubscription!: Subscription;

  ngOnInit(): void {
    this.loadCategories();
    // Subscribe to modal choices for deletion
    this.modalSubscription = this.modalService.userChoice$.subscribe((choice) => {
      if (choice && this.categoryToDeleteId !== null) {
        this.confirmDelete(this.categoryToDeleteId);
      }
      this.categoryToDeleteId = null;
    });
  }

  loadCategories(): void {
    this.isLoading = true;
    this.error = null;
    this.apiService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load categories. Please make sure the API server is running.';
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  private categoryToDeleteId: number | null = null;

  deleteCategory(categoryId: number, categoryName: string): void {
    this.categoryToDeleteId = categoryId;
    this.modalService.open(`Are you sure you want to delete the category "${categoryName}"?`);
  }

  private confirmDelete(categoryId: number): void {
    this.apiService.deleteCategory(categoryId).subscribe({
      next: () => {
        this.toastService.show('Category deleted successfully!');
        this.loadCategories(); // Refresh the list after deleting
      },
      error: (err) => {
        this.toastService.show('Failed to delete category.', 'error');
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
