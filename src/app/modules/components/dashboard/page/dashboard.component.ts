import { Component, OnDestroy, inject } from '@angular/core';
import { ToolBarComponent } from '../../../../shared/tool-bar/tool-bar.component';
import { ProductService } from '../../../../services/products/product.service';
import { Product } from '../../../../models/products/product';
import { ChartModule } from 'primeng/chart';
import { CategoryService } from '../../../../services/categories/category.service';
import { CategoryComponent } from '../../categories/page/category-table/category.component';
import { Subject, takeUntil } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ToolBarComponent,
    CategoryComponent,
    ChartModule,
    MatProgressSpinnerModule
  ],
  providers: [
    CategoryService
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.sass'
})
export class DashboardComponent implements OnDestroy{
  constructor(){}

  public productDataResponse!: boolean;
  private destroy$ = new Subject<void>;
  private productService = inject(ProductService);
  public productsData!: Array<Product>;

  basicOptions: any;
  basicData: any;

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.getAllProducts().pipe(
      takeUntil(
        this.destroy$
      )
    ).subscribe({
      next: (response) => {
        this.productsData = _.sortBy(response, ['quantidadeProduto']);
        if (this.productsData.length == 0) {
          this.productDataResponse = false;
        }
        else{
          this.ChartData();
        }
      }
    });
  }

  ChartData(): void{
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
