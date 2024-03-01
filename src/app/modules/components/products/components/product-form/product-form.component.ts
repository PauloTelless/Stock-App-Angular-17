import { Product } from '../../../../../models/products/product';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../../services/products/product.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../../../services/categories/category.service';
import { Category } from '../../../../../models/category/category';
import { Subject, takeUntil } from 'rxjs';
import { SuccessComponent } from './success/success.component';
import { ErrorComponent } from './error/error.component';

@Component({
  selector: 'app-success-produto-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [
    ProductService,
    CategoryService
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.sass'
})

export class ProductFormComponent implements OnInit, OnDestroy{
  constructor(){}

  ngOnInit(): void {
    this.getAllCategories();
  }

  private destroy$ = new Subject<void>;
  public categoriesData!: Array<Category>;
  private dialogRef = inject(MatDialogRef);
  private dialogService = inject(MatDialog);
  private productService = inject(ProductService);
  private formBuilderService = inject(FormBuilder);
  private categoriaService = inject(CategoryService);

  createProductForm = this.formBuilderService.group({
    nomeProduto: ['', Validators.required],
    descricaoProduto: ['', Validators.required],
    categoriaId: ['', Validators.required],
    precoProduto: ['', Validators.required],
    quantidadeProduto: ['', Validators.required]

  })

  createProductSubmit(): void{
    if (this.createProductForm.valid && this.createProductForm.value) {
      if (!parseInt(this.createProductForm.value.quantidadeProduto ?? '0', 0) || (!parseFloat(this.createProductForm.value.precoProduto ?? '0'))) {
        console.log('errado')
        this.dialogService.open(ErrorComponent, {
          width: '300px',
          height: '300px',
          data: this.createProductForm.value
        });
      }

      if(parseInt(this.createProductForm.value.quantidadeProduto ?? '0', 0) && parseFloat(this.createProductForm.value.precoProduto ?? '0')) {
        this.productService.postProduct(this.createProductForm.value as Product).pipe(
          takeUntil(
            this.destroy$
          )
        ).subscribe({
          next: () => {
            this.dialogRef.close();
            this.dialogService.open(SuccessComponent, {
              width: '300px',
              height: '300px'
            })
          },
          error: (err) => {
          console.log(err)
          }
        });
      };
      }
  };

  getAllCategories(): void{
    this.categoriaService.getAllCategory().pipe(
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
    });
  };

  closeModalCreateFormSubmit(): void{
    this.dialogRef.close();
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
