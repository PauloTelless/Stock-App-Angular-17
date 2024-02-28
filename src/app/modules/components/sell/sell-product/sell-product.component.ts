import { ProductService } from './../../../../services/products/product.service';
import { Component, Inject, OnDestroy, inject, numberAttribute } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Product } from '../../../../models/products/product';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {  MatFormFieldModule } from '@angular/material/form-field';
import {  MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sell-product',
  standalone: true,
  imports: [
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    HttpClientModule
  ],
  providers:[
    ProductService
  ],
  templateUrl: './sell-product.component.html',
  styleUrl: './sell-product.component.sass'
})
export class SellProductComponent implements OnDestroy {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Product) {}

  private formBuilder = inject(FormBuilder);
  public nomeProduto = this.data.nomeProduto;
  public quantidadeProduto = this.data.quantidadeProduto;
  private productService = inject(ProductService);
  private routerService = inject(Router);
  private destroy$ = new Subject<void>();
  private dialogService = inject(MatDialog);

  editProductForm = this.formBuilder.group({
    nomeProduto: this.nomeProduto,
    descricaoProduto: this.data.descricaoProduto,
    categoriaId: this.data.categoriaId,
    precoProduto: this.data.precoProduto,
    quantidadeProduto: ['', Validators.required]
  });

  editProductFormSubmit() {
    const quantidadeAtual: number = parseInt(this.data.quantidadeProduto ?? '0', 10) - parseInt(this.editProductForm.value.quantidadeProduto ?? '0', 10);
    this.editProductForm.value.quantidadeProduto = quantidadeAtual.toString();
    console.log(this.editProductForm.value.quantidadeProduto);
    this.productService.putProduct(this.data.produtoId, this.editProductForm.value as Product).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => this.routerService.navigate(['products'])
    });

    this.dialogService.closeAll();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
