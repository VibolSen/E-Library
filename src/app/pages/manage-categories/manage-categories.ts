import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category, CATEGORIES } from '../../mock-categories';
import { ModalService } from '../../shared/modal.service';

@Component({
  selector: 'app-manage-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './manage-categories.html',
  styleUrl: './manage-categories.css',
})
export class ManageCategoriesComponent implements OnDestroy {
  categories: Category[] = [...CATEGORIES];
  modalService = inject(ModalService);
  private modalSubscription: Subscription;

  constructor() {
    this.modalSubscription = this.modalService.userChoice$.subscribe((choice) => {
      if (choice && this.categoryToDeleteId !== null) {
        this.confirmDelete(this.categoryToDeleteId);
      }
      this.categoryToDeleteId = null;
    });
  }

  private categoryToDeleteId: number | null = null;

  deleteCategory(categoryId: number, categoryName: string): void {
    this.categoryToDeleteId = categoryId;
    this.modalService.open(`Are you sure you want to delete the category "${categoryName}"?`);
  }

  private confirmDelete(categoryId: number): void {
    const index = this.categories.findIndex((cat) => cat.id === categoryId);
    if (index !== -1) {
      this.categories.splice(index, 1);
    }
  }

  ngOnDestroy(): void {
    this.modalSubscription.unsubscribe();
  }
}
