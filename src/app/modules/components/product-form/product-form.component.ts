import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { product } from '../../../models/products/product';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.sass'
})
export class ProductFormComponent {
  private productService = inject(ProductService)
  private formBuilderService = inject(FormBuilder)

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
}
