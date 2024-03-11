import { Component, Inject, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TimeOutLoggedComponent } from '../time-out-logged/time-out-logged.component';

@Component({
  selector: 'app-success-login',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  templateUrl: './success.component.html',
  styleUrl: './success.component.sass'
})
export class SuccessComponent{
  constructor(@Inject(MAT_DIALOG_DATA) public data:any){}

  public salvarLogin!: boolean;
  private dialogRef = inject(MatDialogRef);
  private dialogService = inject(MatDialog);

  checkboxChanged(event: any): void {
    this.salvarLogin = event.checked;
  }

  saveLogin(): void {
    this.salvarLogin = true
  }

  closeModal(): void {
    if (this.salvarLogin == true) {
      localStorage.setItem('token', this.data)
    } else {
      setTimeout(() => {
        this.dialogService.open(TimeOutLoggedComponent, {
          width: '300px',
          height: '300px'
        })
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
      }, 8000);
    };
    this.dialogRef.close()
  };
}
