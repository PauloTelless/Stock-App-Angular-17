import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-success-submit',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './success.component.html',
  styleUrl: './success.component.sass'
})
export class SuccessComponent implements OnInit{
  private dialogRef = inject(MatDialogRef);
  private dialogService = inject(MatDialogRef);

  ngOnInit(): void {
    setTimeout(() => {
      this.dialogRef.close();
    }, 1000);
  };

  closeModalSucess(): void{
    this.recarregarPagina();
    this.dialogService.close();
  };

  recarregarPagina(): void{
    window.location.reload();
  };
}
