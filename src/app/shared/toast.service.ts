import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { take } from 'rxjs/operators';

export type ToastType = 'success' | 'error' | 'info';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private isVisible = new BehaviorSubject<boolean>(false);
  isVisible$ = this.isVisible.asObservable();

  public message: string = '';
  public type: ToastType = 'info';

  show(message: string, type: ToastType = 'success', duration: number = 3000): void {
    this.message = message;
    this.type = type;
    this.isVisible.next(true);

    timer(duration)
      .pipe(take(1))
      .subscribe(() => {
        this.hide();
      });
  }

  hide(): void {
    this.isVisible.next(false);
  }
}
