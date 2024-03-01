import { Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CategoryService } from '../../../../../services/categories/category.service';
import { MatButtonModule } from '@angular/material/button';
import { Subject, takeUntil } from 'rxjs';
import { MatTooltip } from '@angular/material/tooltip';
import { ProductService } from '../../../../../services/products/product.service';

@Component({
  selector: 'app-delete-category',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatTooltip
  ],
  providers:[
    CategoryService,
    ProductService
  ],
  templateUrl: './delete-category.component.html',
  styleUrl: './delete-category.component.sass'
})

export class DeleteCategoryComponent implements OnInit,OnDestroy{
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}
  ngOnInit(): void {
    console.log(this.data)
  }

  private productService = inject(ProductService);
  private destroy$ = new Subject<void>;
  private categorieService = inject(CategoryService);
  private dialogService = inject(MatDialog)

  deleteCategory(){
    this.categorieService.deleteCategory(this.data.categoria.categoriaId).pipe(
      takeUntil(
        this.destroy$
      )
    ).subscribe(() => this.deleteProdutoToo());
   this.recarregarPagina();
   this.dialogService.closeAll();
  }

  deleteProdutoToo(){
    this.productService.deleteProduct(this.data.categoria.produtos.produtoId);
    console.log('data', this.data)
    console.log(this.data.categoria.produtos.produtoId)
  }

  closeModalCategoryDelete(){
    this.dialogService.closeAll();
  }

  recarregarPagina(){
    window.location.reload();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
