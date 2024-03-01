import { Product } from '../../../../../models/products/product';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
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
import * as XLSX from 'xlsx';

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
    PaginatorModule
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
  public productDatas!: Array<Product>;
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
        this.productDatas.forEach(product => {
          const category = this.categoryDatas.find(category => category.categoriaId === product.categoriaId);
          if (category) {
            product.categoriaName = category.nomeCategoria;
          }
        });
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
    let produtos = document.getElementById('excel-table');

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(produtos);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
    XLSX.writeFile(wb, this.fileNameExcel);
  }

  displayedColumns: string[] = ['codigo', 'nome', 'descricao', 'quantidade', 'preco', 'acoes'];

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
