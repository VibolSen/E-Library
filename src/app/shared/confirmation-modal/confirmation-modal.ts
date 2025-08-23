import { Component, inject, ChangeDetectorRef, OnDestroy } from '@angular/core'; // 1. Import new items
import { CommonModule } from '@angular/common';
import { ModalService } from '../modal.service';
import { Subscription } from 'rxjs'; // 2. Import Subscription

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-modal.html',
  styleUrl: './confirmation-modal.css',
})
export class ConfirmationModalComponent implements OnDestroy {
  // 3. Implement OnDestroy
  modalService = inject(ModalService);
  cdr = inject(ChangeDetectorRef); // 4. Inject ChangeDetectorRef

  isModalOpen: boolean = false; // 5. Use a simple boolean property
  private modalSubscription: Subscription;

  constructor() {
    // Subscribe to the service to listen for changes
    this.modalSubscription = this.modalService.isModalOpen$.subscribe((isOpen) => {
      this.isModalOpen = isOpen;
      this.cdr.markForCheck(); // 6. IMPORTANT: Manually trigger change detection
    });
  }

  confirm(): void {
    this.modalService.confirm();
  }

  cancel(): void {
    this.modalService.cancel();
  }

  ngOnDestroy(): void {
    // 7. Unsubscribe to prevent memory leaks
    this.modalSubscription.unsubscribe();
  }
}
