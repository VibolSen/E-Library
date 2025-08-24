import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ApiService, Category } from '../../services/api';
import { ToastService } from '../../shared/toast.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './category-form.html',
  styleUrl: './category-form.css',
})
export class CategoryFormComponent implements OnInit {
  category: Category = { id: 0, name: ''};
  isEditMode: boolean = false;
  isLoading: boolean = false;

  private apiService = inject(ApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toastService = inject(ToastService);

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('id');
    if (categoryId) {
      this.isEditMode = true;
      this.isLoading = true;
      this.apiService.getCategoryById(+categoryId).subscribe((category) => {
        this.category = category;
        this.isLoading = false;
      });
    }
  }

  saveCategory(): void {
    this.isLoading = true; // Show loading state on save
    if (this.isEditMode) {
      this.apiService.updateCategory(this.category.id, this.category).subscribe({
        next: () => {
          this.toastService.show('Category updated successfully!');
          this.router.navigate(['/manage-categories']);
        },
        error: (err) => {
          this.toastService.show('Failed to update category.', 'error');
          console.error(err);
          this.isLoading = false;
        },
      });
    } else {
      this.apiService.createCategory(this.category).subscribe({
        next: () => {
          this.toastService.show('Category created successfully!');
          this.router.navigate(['/manage-categories']);
        },
        error: (err) => {
          this.toastService.show('Failed to create category.', 'error');
          console.error(err);
          this.isLoading = false;
        },
      });
    }
  }
}
