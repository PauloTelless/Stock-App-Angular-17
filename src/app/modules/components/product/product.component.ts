import { product } from './../../../models/products/product';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ToolBarComponent } from '../../shared/components/tool-bar/tool-bar.component';
import { TableModule } from 'primeng/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule} from '@angular/material/table';
import { ProductService } from '../../../services/products/product.service';
import { MatDialogModule, MatDialog } from '@angular/material/dialog'
import { ProductFormComponent } from '../product-form/product-form.component';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { EditComponentComponent } from '../edit-component/edit-product.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    ToolBarComponent,
    ProductFormComponent,
    TableModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.sass'
})

export class ProductComponent implements OnInit, OnDestroy{
  constructor(){}

  private destroy$ = new Subject<void>;
  public productDatas!: Array<product>
  private dialogRef = inject(MatDialog);
  private productService = inject(ProductService);

  ngOnInit(): void {
    this.getAllProducts();

  }

  getAllProducts(): void{
    this.productService.getAllProducts().pipe(
      takeUntil(
        this.destroy$
      )
    ).subscribe({
      next: (response) => {
        this.productDatas = response;
      }
    });
  };

  openModalProductForm(): void{
    this.dialogRef.open(ProductFormComponent, {
      width: '500px',
      height: '600px'
    })
  }

  openModalDeleteProduct(produtoId: string): void{
    this.dialogRef.open(DeleteProductComponent, {
      width: '500px',
      height: '400px',
      data: produtoId
    })
  }

  openModalEditProduct(produtoId: string): void{
    this.dialogRef.open(EditComponentComponent, {
      width: '500px',
      height: '600px',
      data: produtoId
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  displayedColumns: string[] = ['nome', 'descricao', 'quantidade', 'preco', 'acoes'];
}

