import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snackbar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string, action: string = 'Close', duration: number = 3000) {
    this.snackBar.open(message, action, {
      duration,
      panelClass: ['success-toast']
    });
  }

  showError(message: string, action: string = 'Close', duration: number = 3000) {
    this.snackBar.open(message, action, {
      duration,
      panelClass: ['error-toast']
    });
  }
}
