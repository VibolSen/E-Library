import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private isModalOpen = new BehaviorSubject<boolean>(false);
  isModalOpen$ = this.isModalOpen.asObservable();

  // A simple Subject to emit the user's choice (true for confirm, false for cancel)
  private userChoice = new Subject<boolean>();
  userChoice$ = this.userChoice.asObservable();

  // We'll store the message for the modal here
  public modalMessage: string = 'Are you sure?';

  constructor() {}

  open(message: string = 'Are you sure?'): void {
    this.modalMessage = message;
    this.isModalOpen.next(true); // Emit 'true' to open the modal
  }

  confirm(): void {
    this.isModalOpen.next(false); // Close the modal
    this.userChoice.next(true); // Emit 'true' for confirmation
  }

  cancel(): void {
    this.isModalOpen.next(false); // Close the modal
    this.userChoice.next(false); // Emit 'false' for cancellation
  }
}
