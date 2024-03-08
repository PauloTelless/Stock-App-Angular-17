import { Component, OnInit, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delete-user-success',
  standalone: true,
  imports: [
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './delete-user-success.component.html',
  styleUrl: './delete-user-success.component.sass'
})
export class DeleteUserSuccessComponent implements OnInit{
  private dialogRef = inject(MatDialogRef);

  ngOnInit(): void {
    setTimeout(() => {
      this.dialogRef.close()
    }, 2500);
    this.recarregarPagina();
  }

  recarregarPagina(){
    window.location.reload();
  }
}
