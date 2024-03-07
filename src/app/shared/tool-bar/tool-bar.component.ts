import { Component, Input, inject } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
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
  @Input() public logoutInfo!: any;

  redirecionarLogin(){
    localStorage.removeItem(this.logoutInfo)
    this.routerService.navigate(['login']);
  }

  redirecionarProdutos(){
    this.routerService.navigate(['products']);
  }

  redirecionarCategorias(){
    this.routerService.navigate(['categories']);
  }

  redirecionarVendas(){
    this.routerService.navigate(['sell']);
  }

  redirecionarDashboard(){
    this.routerService.navigate(['dashboard']);
  }

  turnDarkMode(){

  }


}
