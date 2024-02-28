import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { ProductService } from './services/products/product.service';
import { ChartModule } from 'primeng/chart';
import { MatTableModule } from '@angular/material/table';
import { CategoryService } from './services/categories/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ChartModule,
    HttpClientModule,
    MatTableModule,
    RouterOutlet
  ],
  providers: [
    AuthService,
    ProductService,
    CategoryService,
    HttpClient
  ],
  host: { ngSkipHydration: 'true' },
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'stock-app';
}
