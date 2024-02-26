import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './modules/page/login/login.component';
import { CadastroComponent } from './modules/page/cadastro/cadastro.component';
import { ProductService } from './services/product.service';
import { ChartModule } from 'primeng/chart';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    ChartModule,
    MatTableModule
  ],
  providers: [
    AuthService,
    ProductService,
    HttpClient
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'stock-app';
}
