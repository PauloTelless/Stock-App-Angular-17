import { Component } from '@angular/core';
import { ToolBarComponent } from '../../shared/components/tool-bar/tool-bar.component';
import { ProductService } from '../../../services/product.service';
import { product } from '../../../models/products/product';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ToolBarComponent,
    ChartModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.sass'
})
export class DashboardComponent {
  constructor(private productService: ProductService) {}

  basicOptions: any;
  basicData: any;
  public productsData!: Array<product>;

  ngOnInit() {
    this.getAllProducts();
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
          data: this.productsData.map((nameProduct) => nameProduct.quantidadeProduto),
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
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
