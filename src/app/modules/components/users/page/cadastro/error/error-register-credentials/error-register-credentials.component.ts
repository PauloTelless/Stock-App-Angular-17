import { Component, OnInit, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-error-register-credentials',
  standalone: true,
  imports: [
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './error-register-credentials.component.html',
  styleUrl: './error-register-credentials.component.sass'
})
export class ErrorRegisterCredentialsComponent implements OnInit{
  private dialogRef = inject(MatDialogRef)

  ngOnInit(): void {
    setTimeout(() => {
      this.dialogRef.close();
    }, 2500);
  };

}
