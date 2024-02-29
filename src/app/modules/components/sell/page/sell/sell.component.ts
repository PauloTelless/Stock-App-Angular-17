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


@Component({
  selector: 'app-sell',
  standalone: true,
  imports: [
    ToolBarComponent,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    SellProductComponent,
    MatTooltipModule
  ],
  templateUrl: './sell.component.html',
  styleUrl: './sell.component.sass'
})
export class SellComponent implements OnInit, OnDestroy{

  ngOnInit(): void {
    this.getAllProducts();
  }

  private dialogService = inject(MatDialog);
  private destroy$ = new Subject<void>
  private productService = inject(ProductService);
  public productDatas!: Array<Product>;

  getAllProducts(){
    this.productService.getAllProducts().pipe(
      takeUntil(
        this.destroy$
      )
    ).subscribe({
      next: (response) => {
        this.productDatas = response;
      }
    })
  }

  openModalSellProduct(produto: Product){
    this.dialogService.open(SellProductComponent,{
      width: '500px',
      height: '600px',
      data: produto
    })
  }

  displayedColumns: string[] = ['codigo', 'nome', 'acoes', 'disponivel'];

    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
}