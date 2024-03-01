import { Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../../../../services/categories/category.service';
import { MatButtonModule } from '@angular/material/button';
import { Subject, takeUntil } from 'rxjs';
import { MatTooltip } from '@angular/material/tooltip';
import { ProductService } from '../../../../../services/products/product.service';
import { SuccessComponent } from './success/success.component';

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

  private destroy$ = new Subject<void>;
  private categorieService = inject(CategoryService);
  private dialogService = inject(MatDialog)
  private dialogRef = inject(MatDialogRef)

  deleteCategory(): void{
    this.categorieService.deleteCategory(this.data.categoria.categoriaId).pipe(
      takeUntil(
        this.destroy$
      )
    ).subscribe();
    this.dialogRef.close();
    this.dialogService.open(SuccessComponent, {
      width: '300px',
      height: '300px'
    })
  }

  closeModalCategoryDelete(): void{
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
