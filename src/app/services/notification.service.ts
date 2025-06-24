import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string, action: string = 'OK', duration: number = 4000) {
    this.snackBar.open(message, action, {
      duration,
      panelClass: ['snackbar-success']
    });
  }

  error(message: string, action: string = 'Cerrar', duration: number = 4000) {
    this.snackBar.open(message, action, {
      duration,
      panelClass: ['snackbar-error']
    });
  }

  info(message: string, action: string = 'OK', duration: number = 4000) {
    this.snackBar.open(message, action, {
      duration,
      panelClass: ['snackbar-info']
    });
  }
}