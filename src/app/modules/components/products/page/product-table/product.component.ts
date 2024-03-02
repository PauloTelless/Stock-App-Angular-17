import { Product } from '../../../../../models/products/product';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ToolBarComponent } from '../../../../../shared/tool-bar/tool-bar.component';
import { TableModule } from 'primeng/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule} from '@angular/material/table';
import { ProductService } from '../../../../../services/products/product.service';
import { MatDialogModule, MatDialog } from '@angular/material/dialog'
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { DeleteProductComponent } from '../../components/delete-product/delete-product.component';
import { EditProductComponent } from '../../components/edit-product/edit-product.component';
import { Subject, takeUntil } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PaginatorModule } from 'primeng/paginator';
import { CategoryService } from '../../../../../services/categories/category.service';
import { Category } from '../../../../../models/category/category';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import { ProductsCategories } from '../../../../../models/products/productsCategories';

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
    MatDialogModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    PaginatorModule,
    CommonModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.sass'
})

export class ProductComponent implements  OnInit, OnDestroy{
  constructor(){}

  private destroy$ = new Subject<void>;
  private categoryService = inject(CategoryService);
  private productService = inject(ProductService);
  private dialogRef = inject(MatDialog);
  public categoryDataResponse!: boolean;
  public productsDataResponse!: boolean;
  public productDatas!: Array<Product>;
  public productDatasCategories!: Array<ProductsCategories>;
  public categoryDatas!: Array<Category>;
  private fileNameExcel = 'produtos.xlsx';

  ngOnInit(): void {
    this.getAllCategories();
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
        if (this.productDatas.length == 0) {
          this.productsDataResponse = false;
        }
      },
      error: (err) => {
      console.log(err);
      }
    });
  };

  getAllCategories(): void{
    this.categoryService.getAllCategory().pipe(
      takeUntil(
        this.destroy$
      )
    ).subscribe({
      next: (response) => {
        this.categoryDatas = response;
        if (this.categoryDatas.length == 0) {
          this.categoryDataResponse = false
        }
      }
    })
  }

  openModalProductForm(): void{
    this.dialogRef.open(ProductFormComponent, {
      width: '500px',
      height: '600px'
    })
  }

  openModalDeleteProduct(produtoId: string, produto: Product): void{
    this.dialogRef.open(DeleteProductComponent, {
      width: '500px',
      height: '400px',
      data: {produtoId, produto}
    })
  }

  openModalEditProduct(produtoId: string, produto: Product): void{
    this.dialogRef.open(EditProductComponent, {
      width: '500px',
      height: '600px',
      data: {produtoId, produto}
    })
  }

  exportToExcel(): void{
    let produtos = this.productDatas;

    const workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(produtos);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workBook, workSheet, 'Relatório');
    XLSX.writeFile(workBook, this.fileNameExcel);
  }

  displayedColumns: string[] = ['codigo', 'nome', 'descricao', 'quantidade', 'preco', 'acoes'];

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
