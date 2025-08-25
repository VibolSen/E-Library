import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../modal.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-modal.html',
  styleUrl: './confirmation-modal.css',
})
export class ConfirmationModalComponent {
  modalService = inject(ModalService);
  // We just expose the observable to the template
  isModalOpen$: Observable<boolean>;

  constructor() {
    // Get the observable directly from the service
    this.isModalOpen$ = this.modalService.isModalOpen$;
  }

  confirm(): void {
    this.modalService.confirm();
  }

  cancel(): void {
    this.modalService.cancel();
  }
}
