import { Component } from '@angular/core';
import { ToolBarComponent } from '../../shared/components/tool-bar/tool-bar.component';
import { ProductService } from '../../../services/product.service';
import { product } from '../../../models/products/product';
import { ChartModule } from 'primeng/chart';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category/category';
import { CategoryComponent } from '../category/category.component';

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
  constructor(private productService: ProductService, private caregoryService: CategoryService) {}
  public categoriesData!: Array<Category>;

  basicOptions: any;
  basicData: any;
  public productsData!: Array<product>;

  ngOnInit() {
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        console.log(response);
        this.productsData = response;
        this.ChartData();
      }
    });
  }

  getAllCategories(){
    this.caregoryService.getAllCategory().subscribe({
      next: (response) => {
        this.categoriesData = response;
      }
    })
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
