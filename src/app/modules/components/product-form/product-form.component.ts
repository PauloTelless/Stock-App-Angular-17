import { product } from './../../../models/products/product';
import { Component, Input, OnDestroy, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [
    ProductService
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.sass'
})
export class ProductFormComponent {
  private dialogService = inject(MatDialog);
  private routerService = inject(Router);
  private productService = inject(ProductService);
  private formBuilderService = inject(FormBuilder);

  createProductForm = this.formBuilderService.group({
    nomeProduto: ['', Validators.required],
    descricaoProduto: ['', Validators.required],
    precoProduto: ['', Validators.required],
    quantidadeProduto: ['', Validators.required]

  })

  createProductSubmit(){
    if (this.createProductForm.valid && this.createProductForm.value) {
      this.productService.postProduct(this.createProductForm.value as product).subscribe({
        next: (response) => {
          console.log(response);
        }
      })
    }
  }


  closeModalCreateFormSubmti(){
    this.dialogService.closeAll();
  }
}
