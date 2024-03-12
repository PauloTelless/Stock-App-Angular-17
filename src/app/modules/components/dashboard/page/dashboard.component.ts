import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ToolBarComponent } from '../../../../shared/tool-bar/tool-bar.component';
import { ProductService } from '../../../../services/products/product.service';
import { Product } from '../../../../models/products/product';
import { ChartModule } from 'primeng/chart';
import { CategoryService } from '../../../../services/categories/category.service';
import { CategoryComponent } from '../../categories/page/category-table/category.component';
import { Subject, takeUntil } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ToolBarComponent,
    CategoryComponent,
    ChartModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  providers: [
    CategoryService
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.sass'
})
export class DashboardComponent implements OnInit, OnDestroy{
  constructor(){}

  ngOnInit(): void {
    this.getAllProducts();
  }
  private productService = inject(ProductService);
  private destroy$ = new Subject<void>;
  public productDataResponse!: boolean;
  public productsData!: Array<Product>;
  public produtoSelecaoPropriedade = [
    {propriedade: 'Nome'},
    {propriedade: 'Quantidade - Maior'},
    {propriedade: 'Quantidade - Menor'},
    {propriedade: 'Preço - Maior'},
    {propriedade: 'Preço - Menor'}
  ]

  basicOptions: any;
  basicData: any;

  getAllProducts(): void {
    this.productService.getAllProducts().pipe(
      takeUntil(
        this.destroy$
      )
    ).subscribe({
      next: (response) => {
        this.productsData = response;
        if (this.productsData.length == 0) {
          this.productDataResponse = false;
        }
        else{
          this.ChartData();
        }
      }
    });
  }

  selecionarOrdernamento(event: MatSelectChange): void{
    const propriedadeSelecionada = event.value as string;

    switch (propriedadeSelecionada) {
      case 'Nome':
        this.productsData = _.sortBy(this.productsData, ['nomeProduto'])
        break;
      case 'Quantidade - Maior':
        this.productsData = _.orderBy(this.productsData, ['quantidadeProduto'],['desc'])
        break;
      case 'Quantidade - Menor':
        this.productsData = _.orderBy(this.productsData, ['quantidadeProduto'],['asc'])
        break;
      case 'Preço - Maior':
        this.productsData = _.orderBy(this.productsData, ['precoProduto'],['desc'])
        break;
      case 'Preço - Menor':
        this.productsData = _.orderBy(this.productsData, ['precoProduto'],['asc'])
        break;
    }

    this.ChartData();
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
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  };
}
