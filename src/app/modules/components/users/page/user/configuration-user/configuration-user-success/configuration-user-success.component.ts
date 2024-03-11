import { Component, OnInit, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-configuration-user-success',
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './configuration-user-success.component.html',
  styleUrl: './configuration-user-success.component.sass'
})
export class ConfigurationUserSuccessComponent implements OnInit{
  private dialogRef = inject(MatDialogRef)

  ngOnInit(): void {
    setTimeout(() => {
      this.dialogRef.close();
    }, 2500);
  }

}
