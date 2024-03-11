import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LogoutConfirmComponent } from '../logout-confirm/logout-confirm.component';

@Component({
  selector: 'app-tool-bar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.sass'
})
export class ToolBarComponent {

  private dialogService = inject(MatDialog);
  private routerService = inject(Router);

  logout(): void{
    this.dialogService.open(LogoutConfirmComponent, {
      width: '250px',
      height: '250px'
    });
  };

  redirecionarProdutos(): void{
    this.routerService.navigate(['products']);
  };

  redirecionarCategorias(): void{
    this.routerService.navigate(['categories']);
  };

  redirecionarVendas(): void{
    this.routerService.navigate(['sell']);
  };

  redirecionarDashboard(): void{
    this.routerService.navigate(['dashboard']);
  };

  redirecionarPaginaUsuario(): void{
    this.routerService.navigate(['user'])
  };
}
