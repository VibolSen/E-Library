import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Resource, RESOURCES } from '../../mock-resources';
import { ModalService } from '../../shared/modal.service';

@Component({
  selector: 'app-manage-resources',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './manage-resources.html',
  styleUrl: './manage-resources.css',
})
export class ManageResourcesComponent implements OnDestroy {
  // CORRECTED: Create a mutable copy of the imported array
  resources: Resource[] = [...RESOURCES];

  modalService = inject(ModalService);
  private modalSubscription: Subscription;

  constructor() {
    this.modalSubscription = this.modalService.userChoice$.subscribe((choice) => {
      if (choice && this.resourceToDeleteId !== null) {
        this.confirmDelete(this.resourceToDeleteId);
      }
      this.resourceToDeleteId = null;
    });
  }

  private resourceToDeleteId: number | null = null;

  deleteResource(resourceId: number, resourceTitle: string): void {
    this.resourceToDeleteId = resourceId;
    this.modalService.open(`Are you sure you want to delete "${resourceTitle}"?`);
  }

  private confirmDelete(resourceId: number): void {
    // Now this will work because 'this.resources' is a mutable array
    const index = this.resources.findIndex((res) => res.id === resourceId);
    if (index !== -1) {
      this.resources.splice(index, 1);
    }
  }

  ngOnDestroy(): void {
    this.modalSubscription.unsubscribe();
  }
}
