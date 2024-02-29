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
import * as XLSX from 'xlsx';
import { CategoryProducts } from '../../../../../models/category/categoryProducts';

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
    MatTooltipModule
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.sass'
})
export class CategoryComponent implements OnInit, OnDestroy{
  constructor(){}

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllCategoriesProducts();
  }

  public categoriesProdutos!: Array<CategoryProducts>
  private dialogService = inject(MatDialog);
  private categoryService = inject(CategoryService);
  private destroy$ = new Subject<void>;
  public categoriesData!: Array<Category>
  private fileNameExcel = 'categorias.xlsx'

  getAllCategories(){
    this.categoryService.getAllCategory().pipe(
      takeUntil(
        this.destroy$
      )
    ).subscribe({
      next: (response) => {
        this.categoriesData = response;
      },
      error: (err) => {
      console.log(err)
      }
    })
  }

  openModalCategoryForm(){
    this.dialogService.open(CategoryFormComponent, {
      width: '400px',
      height: '300px'
    })
  }

  openModalEditCategory(categoriaId: string, categoria: Category){
    this.dialogService.open(EditCategoryComponent, {
      width: '400px',
      height: '300px',
      data: {categoriaId, categoria}
    })
  }

  openModalDeleteCategory(categoriaId: string, categoria: Category){
    this.dialogService.open(DeleteCategoryComponent,{
      width: '500px',
      height: '400px',
      data: {categoriaId, categoria}
    })
  }

  getAllCategoriesProducts(){
    this.categoryService.getAllCategoriesProducts().subscribe({
      next: (response => {
        this.categoriesProdutos = response;
        console.log(response)
      })
    })
  }

  exportToExcel(){
    let categorias = document.getElementById('table-excel');

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(categorias);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1')
    XLSX.writeFile(wb, this.fileNameExcel)
  }

  displayedColumns: string[] = ['codigo', 'nome', 'acoes'];

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
