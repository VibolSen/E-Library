import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Resource, RESOURCES } from '../../mock-resources';

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

  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    const resourceId = this.route.snapshot.paramMap.get('id');
    if (resourceId) {
      this.isEditMode = true;
      const foundResource = RESOURCES.find((res) => res.id === +resourceId);
      if (foundResource) {
        // Create a copy to prevent instant updates in the table
        this.resource = { ...foundResource };
      }
    }
  }

  saveResource() {
    if (this.isEditMode) {
      const index = RESOURCES.findIndex((res) => res.id === this.resource.id);
      if (index !== -1) {
        RESOURCES[index] = this.resource;
      }
    } else {
      this.resource.id = Date.now();
      RESOURCES.unshift(this.resource);
    }
    this.router.navigate(['/manage-resources']);
  }

  private getNewResource(): Resource {
    return { id: 0, title: '', author: '', url: '', type: 'Article', categoryId: 0 };
  }
}
