import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-success-login',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './success.component.html',
  styleUrl: './success.component.sass'
})
export class SuccessComponent implements OnInit{
  private dialogService = inject(MatDialogRef);

  ngOnInit(): void {
    this.closeModalSucess();
  }

  closeModalSucess(): void{
    setTimeout(() => {
      this.dialogService.close();
    }, 1000)
  }

  recarregarPagina(): void{
    window.location.reload();
  }
}
