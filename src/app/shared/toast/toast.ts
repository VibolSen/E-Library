import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ToastService, ToastType } from '../toast.service'; // Correct path to the service

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class ToastComponent {
  toastService = inject(ToastService);
  isVisible$: Observable<boolean>;

  constructor() {
    this.isVisible$ = this.toastService.isVisible$;
  }

  getToastClass(): string {
    const baseClass =
      'fixed top-5 right-5 z-50 p-4 rounded-md shadow-lg text-white text-sm font-semibold flex items-center';
    const typeClasses: { [key in ToastType]: string } = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      info: 'bg-blue-500',
    };
    return `${baseClass} ${typeClasses[this.toastService.type]}`;
  }
}
