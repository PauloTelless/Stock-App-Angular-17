import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ToolBarComponent } from '../../../../../shared/tool-bar/tool-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../../../../models/products/product';
import { ProductService } from '../../../../../services/products/product.service';
import { MatTableModule } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SellProductComponent } from '../../components/sell-product/sell-product.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import * as _ from 'lodash';

@Component({
  selector: 'app-sell',
  standalone: true,
  imports: [
    ToolBarComponent,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    SellProductComponent,
    MatTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormField,
    MatInputModule
  ],
  templateUrl: './sell.component.html',
  styleUrl: './sell.component.sass'
})
export class SellComponent implements OnInit, OnDestroy{

  ngOnInit(): void {
    this.getAllProducts();
    this.formSearchProductSell.valueChanges.subscribe(() => {
      this.searchProductSell()
    });
  };

  private dialogService = inject(MatDialog);
  private productService = inject(ProductService);
  private formBuilder = inject(FormBuilder);
  public productDataResponse!: boolean;
  private destroy$ = new Subject<void>
  public productDatas!: Array<Product>;

  formSearchProductSell = this.formBuilder.group({
    nomeProduto: ['']
  })

  getAllProducts(): void{
    this.productService.getAllProducts().pipe(
      takeUntil(
        this.destroy$
      )
    ).subscribe({
      next: (response) => {
        this.productDatas = _.sortBy(response, ['nomeProduto']);
        if (this.productDatas.length == 0) {
          this.productDataResponse = false;
        };
      }
    });
  };

  searchProductSell(): void{
    const nomeProduto = this.formSearchProductSell.value.nomeProduto?.toUpperCase();
    if (!nomeProduto || nomeProduto.trim() === '') {
      this.getAllProducts();
      return;
    };

    this.productDatas = _.filter(this.productDatas, (produto) => {
      return produto.nomeProduto.toUpperCase().includes(nomeProduto)
    });
  };

  openModalSellProduct(produto: Product): void{
    this.dialogService.open(SellProductComponent,{
      width: '500px',
      height: '600px',
      data: produto
    });
  };

  displayedColumns: string[] = ['codigo', 'nome', 'acoes', 'disponivel'];

    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    };
}
