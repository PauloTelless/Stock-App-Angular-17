import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-confirm',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './logout-confirm.component.html',
  styleUrl: './logout-confirm.component.sass'
})
export class LogoutConfirmComponent{
  private routerService = inject(Router);
  private dialogRef = inject(MatDialogRef);

  logout(): void{
    this.dialogRef.close();
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.routerService.navigate(['login']);
  };

  closeModalLogoutConfirm(): void{
    this.dialogRef.close();
  }
}
