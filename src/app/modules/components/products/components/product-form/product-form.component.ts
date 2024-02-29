import { Product } from '../../../../../models/products/product';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../../services/products/product.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../../../services/categories/category.service';
import { Category } from '../../../../../models/category/category';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-form',
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
  private dialogService = inject(MatDialog);
  private productService = inject(ProductService);
  private formBuilderService = inject(FormBuilder);
  private categoriaService = inject(CategoryService);
  public categoriesData!: Array<Category>;

  createProductForm = this.formBuilderService.group({
    nomeProduto: ['', Validators.required],
    descricaoProduto: ['', Validators.required],
    categoriaId: ['', Validators.required],
    precoProduto: ['', Validators.required],
    quantidadeProduto: ['', Validators.required]

  })

  createProductSubmit(){
    if (this.createProductForm.valid && this.createProductForm.value) {
      this.productService.postProduct(this.createProductForm.value as Product).pipe(
        takeUntil(
          this.destroy$
        )
      ).subscribe({
        next: () => {
          this.recarregarPagina();
        },
        error: (err) => {
        console.log(err)
        }
      });
    };
  };

  getAllCategories(){
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

  recarregarPagina(){
    window.location.reload();
  }

  closeModalCreateFormSubmti(){
    this.dialogService.closeAll();
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
