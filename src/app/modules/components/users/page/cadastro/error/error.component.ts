import { Component, OnInit, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-error-cadastro',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './error.component.html',
  styleUrl: './error.component.sass'
})
export class ErrorComponent implements OnInit{
  private dialogService = inject(MatDialogRef);

  ngOnInit(): void {
    setTimeout(() => {
      this.dialogService.close()
    }, 1500)
  }
}
