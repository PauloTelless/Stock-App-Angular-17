import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tool-bar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.sass'
})
export class ToolBarComponent {
  private routerService = inject(Router)

  logout(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.routerService.navigate(['login']);
  }

  redirecionarProdutos(): void{
    this.routerService.navigate(['products']);
  }

  redirecionarCategorias(): void{
    this.routerService.navigate(['categories']);
  }

  redirecionarVendas(): void{
    this.routerService.navigate(['sell']);
  }

  redirecionarDashboard(): void{
    this.routerService.navigate(['dashboard']);
  }

  redirecionarPaginaUsuario(): void{
    this.routerService.navigate(['user'])
  }
}
