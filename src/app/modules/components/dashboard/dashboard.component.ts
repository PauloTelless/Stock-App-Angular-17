import { Component, inject } from '@angular/core';
import { ToolBarComponent } from '../../../shared/tool-bar/tool-bar.component';
import { ProductService } from '../../../services/products/product.service';
import { Product } from '../../../models/products/product';
import { ChartModule } from 'primeng/chart';
import { CategoryService } from '../../../services/categories/category.service';
import { CategoryComponent } from '../categories/category-table/category.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ToolBarComponent,
    CategoryComponent,
    ChartModule
  ],
  providers: [
    CategoryService
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.sass'
})
export class DashboardComponent {
  constructor(){}

  private productService = inject(ProductService);
  public productsData!: Array<Product>;

  basicOptions: any;
  basicData: any;

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.productsData = response;
        this.ChartData();
      }
    });
  }

  ChartData() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicData = {
      labels: this.productsData.map((name) => name.nomeProduto),
      datasets: [
        {
          label: 'Quantidade',
          data: this.productsData.map((quantityProduct) => quantityProduct.quantidadeProduto),
          borderWidth: 1
        }
      ]
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }
}
