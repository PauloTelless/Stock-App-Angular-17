import { Component, Inject, OnInit, inject, OnDestroy } from '@angular/core';
import { product } from '../../../models/products/product';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/products/product.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../services/categories/category.service';
import { Category } from '../../../models/category/category';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-component',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers:[
    CategoryService,
    ProductService
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-component.component.sass'
})

export class EditComponentComponent implements OnInit, OnDestroy{
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) { }

  private destroy$ = new Subject<void>;
  public productsData!: Array<product>;
  public categoriesData!: Array<Category>;
  private productService = inject(ProductService);
  private categoriaService = inject(CategoryService);
  private formBuilder = inject(FormBuilder);
  private routerService = inject(Router);
  private dialogService = inject(MatDialog);

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllProducts();
  }

  editProductForm = this.formBuilder.group({
    nomeProduto: ['', Validators.required],
    descricaoProduto: ['', Validators.required],
    categoriaId: ['', Validators.required],
    precoProduto: ['', Validators.required],
    quantidadeProduto: ['', Validators.required]
  })

  getAllCategories(): void{
    this.categoriaService.getAllCategory().pipe(
      takeUntil(
        this.destroy$
        )
        ).subscribe({
          next: (response) => {
          console.log(response)
        this.categoriesData = response;
      }
    })
  }

  getAllProducts(): void{
    this.productService.getAllProducts().pipe(
      takeUntil(
        this.destroy$
      )
    ).subscribe({
      next: (response) =>{
        this.productsData = response;
      }
    })
  }

  putProduct(): void{
    this.productService.putProduct(this.data, this.editProductForm.value as product).pipe(
      takeUntil(
        this.destroy$
      )
    ).subscribe(() => {
      this.routerService.navigate(['/dashboard'])
      this.dialogService.closeAll();
    }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
