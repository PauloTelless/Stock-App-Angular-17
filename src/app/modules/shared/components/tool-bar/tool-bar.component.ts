import { Component, inject } from '@angular/core';
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

  handleLogout(){
    this.routerService.navigate(['login']);
  }

  handleProduct(){
    this.routerService.navigate(['products']);
  }

  handleCategory(){
    this.routerService.navigate(['categories']);
  }

  handleSell(){
    this.routerService.navigate(['sell']);
  }

  handleDashboard(){
    this.routerService.navigate(['dashboard']);
  }
}
