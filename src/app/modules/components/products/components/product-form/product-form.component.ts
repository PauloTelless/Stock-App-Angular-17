import { Product } from '../../../../../models/products/product';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../../services/products/product.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
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

  public categoriaProduto!: string;
  private destroy$ = new Subject<void>;
  public categoriesData!: Array<Category>;
  private dialogRef = inject(MatDialogRef);
  private dialogService = inject(MatDialog);
  private productService = inject(ProductService);
  private formBuilderService = inject(FormBuilder);
  private categoriaService = inject(CategoryService);

  selecionarCategoriaProduto(event: MatSelectChange){
    const categoriaIdSelecionada = event.value;
    const categoriaSelecionada = this.categoriesData.find((categoria) => categoria.categoriaId == categoriaIdSelecionada);
    if (categoriaSelecionada) {
      this.createProductForm.patchValue({categoriaProduto: categoriaSelecionada.nomeCategoria})
    }
  }

  createProductForm = this.formBuilderService.group({
    nomeProduto: ['', Validators.required],
    marcaProduto: ['', Validators.required],
    categoriaProduto: ['', Validators.required],
    descricaoProduto: ['', Validators.required],
    precoProduto: ['', Validators.required],
    quantidadeProduto: ['', Validators.required],
    categoriaId: ['', Validators.required]
  })

  createProductSubmit(): void{
    if (this.createProductForm.valid && this.createProductForm.value) {
      const precoProduto: number = parseFloat(this.createProductForm.value.precoProduto ?? '0.0');

      this.createProductForm.value.nomeProduto = this.createProductForm.value.nomeProduto?.toUpperCase();
      this.createProductForm.value.marcaProduto = this.createProductForm.value.marcaProduto?.toUpperCase();
      if (!parseInt(this.createProductForm.value.quantidadeProduto ?? '0', 0) || (!parseFloat(this.createProductForm.value.precoProduto ?? '0'))) {
        this.dialogService.open(ErrorComponent, {
          width: '300px',
          height: '300px'
        });
      };

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
            });
          },
          error: (err) => {
          console.log(err)
          }
        });
      };
    };
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
  };
}
