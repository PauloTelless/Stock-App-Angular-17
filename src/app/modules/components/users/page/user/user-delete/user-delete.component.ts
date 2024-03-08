import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from '../../login/login.component';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-user-delete',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './user-delete.component.html',
  styleUrl: './user-delete.component.sass'
})
export class UserDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data:any ){}

  private dialogService = inject(MatDialog);
  private dialogRef = inject(MatDialogRef);

  openModalLogin(){
    this.dialogService.open(LoginFormComponent, {
      width: '350px',
      height: '350px',
      data: this.data
    })
    this.dialogRef.close()
  }
}
