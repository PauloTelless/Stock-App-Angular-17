import { Component, Inject, OnInit, inject } from '@angular/core';
import { product } from './../../../models/products/product';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category/category';
import { response } from 'express';

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
  templateUrl: './edit-component.component.html',
  styleUrl: './edit-component.component.sass'
})
export class EditComponentComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data: product, private productService: ProductService, private routerService: Router, private dialogService: MatDialog) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  public categoriesData!: Array<Category>;
  private categoriaService = inject(CategoryService);
  private formBuilder = inject(FormBuilder);

  editProductForm = this.formBuilder.group({
    nomeProduto: ['', Validators.required],
    descricaoProduto: ['', Validators.required],
    categoriaId: ['', Validators.required],
    precoProduto: ['', Validators.required],
    quantidadeProduto: ['', Validators.required]
  })

  getAllCategories(){
    this.categoriaService.getAllCategory().subscribe({
      next: (response) => {
        this.categoriesData = response;
      }
    })
  }

  putProduct(produtoId: string){
    console.log(produtoId);
    this.productService.putProduct(produtoId).subscribe({
      next: (response) => {
        console.log(response);
      }
    })
  }
}
