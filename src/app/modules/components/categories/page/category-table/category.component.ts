import { Product } from './../../../../../models/products/product';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ToolBarComponent } from '../../../../../shared/tool-bar/tool-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Category } from '../../../../../models/category/category';
import { CategoryService } from '../../../../../services/categories/category.service';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CategoryFormComponent } from '../../components/category-form/category-form.component';
import { DeleteCategoryComponent } from '../../components/delete-category/delete-category.component';
import { EditCategoryComponent } from '../../components/edit-category/edit-category.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductService } from '../../../../../services/products/product.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as _ from 'lodash';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    ToolBarComponent,
    MatButtonModule,
    MatFormField,
    MatInput,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.sass'
})
export class CategoryComponent implements OnInit, OnDestroy{
  constructor(){}

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllProducts();
  }

  public categoriesData!: Array<Category>;
  public productsData!: Array<Product>;
  public categoryDataResponse!: boolean;
  private destroy$ = new Subject<void>;
  private productService = inject(ProductService);
  private dialogService = inject(MatDialog);
  private categoryService = inject(CategoryService);
  private fileNameExcel = 'categorias.xlsx'

  getAllCategories(): void{
    this.categoryService.getAllCategory().pipe(
      takeUntil(
        this.destroy$
      )
    ).subscribe({
      next: (response) => {
        this.categoriesData = _.sortBy(response, ['nomeCategoria']);
        if (this.categoriesData.length == 0) {
          this.categoryDataResponse = false
        }
      },
      error: (err) => {
      console.log(err)
      }
    })
  }

  getAllProducts(): void{
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.productsData = response;
      }
    });
  }

  openModalCategoryForm(): void{
    this.dialogService.open(CategoryFormComponent, {
      width: '400px',
      height: '300px'
    })
  }

  openModalEditCategory(categoriaId: string, categoria: Category): void{
    this.dialogService.open(EditCategoryComponent, {
      width: '400px',
      height: '300px',
      data: {categoriaId, categoria}
    })
  }

  openModalDeleteCategory(categoriaId: string, categoria: Category): void{
    this.dialogService.open(DeleteCategoryComponent,{
      width: '500px',
      height: '400px',
      data: {categoriaId, categoria}
    })
  }

  exportToExcel(): void{
    let categorias = this.categoriesData;

    const WorkSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(categorias);
    const WorkBook: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(WorkBook, WorkSheet, 'Categorias')
    XLSX.writeFile(WorkBook, this.fileNameExcel)
  }

  displayedColumns: string[] = ['codigo', 'nome', 'acoes'];

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
