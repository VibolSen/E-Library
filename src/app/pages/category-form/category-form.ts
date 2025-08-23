import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Category, CATEGORIES } from '../../mock-categories';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './category-form.html',
  styleUrl: './category-form.css',
})
export class CategoryFormComponent implements OnInit {
  category: Category = { id: 0, name: '', description: '' };
  isEditMode: boolean = false;

  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('id');
    if (categoryId) {
      this.isEditMode = true;
      const foundCategory = CATEGORIES.find((cat) => cat.id === +categoryId);
      if (foundCategory) {
        this.category = { ...foundCategory };
      }
    }
  }

  saveCategory() {
    if (this.isEditMode) {
      const index = CATEGORIES.findIndex((cat) => cat.id === this.category.id);
      if (index !== -1) {
        CATEGORIES[index] = this.category;
      }
    } else {
      this.category.id = Date.now();
      CATEGORIES.unshift(this.category);
    }
    this.router.navigate(['/manage-categories']);
  }
}
