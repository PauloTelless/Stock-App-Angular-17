import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-success-produto-delete',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './success.component.html',
  styleUrl: './success.component.sass'
})
export class SuccessComponent {
  private dialogService = inject(MatDialogRef);

  closeModalSucess(): void{
    this.recarregarPagina();
    this.dialogService.close();
  };

  recarregarPagina(): void{
    window.location.reload();
  };
}
