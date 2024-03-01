import { ProductService } from '../../../../../services/products/product.service';
import { Component, Inject, OnDestroy, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../../../models/products/product';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { Subject, takeUntil } from 'rxjs';
import { MatTooltip } from '@angular/material/tooltip';
import { ErrorComponent } from './error/error.component';
import { SuccessComponent } from '../success/success.component';


@Component({
  selector: 'app-sell-product',
  standalone: true,
  imports: [
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    HttpClientModule,
    MatTooltip
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
  private dialogService = inject(MatDialog);
  private dialogRef = inject(MatDialogRef);
  private productService = inject(ProductService);
  public nomeProduto = this.data.nomeProduto;
  public quantidadeProduto = this.data.quantidadeProduto;
  private destroy$ = new Subject<void>();

  sellProductForm = this.formBuilder.group({
    nomeProduto: this.nomeProduto,
    descricaoProduto: this.data.descricaoProduto,
    categoriaId: this.data.categoriaId,
    precoProduto: this.data.precoProduto,
    quantidadeProduto: ['', Validators.required]
  });

  sellProductFormSubmit(): void {
    const quantidadeProduto = parseInt(this.data.quantidadeProduto ?? '0', 10) ;
    if (parseInt(this.sellProductForm.value.quantidadeProduto ?? '0', 10) > quantidadeProduto || parseInt(this.sellProductForm.value.quantidadeProduto ?? '0', 10) < 0 || !parseInt(this.sellProductForm.value.quantidadeProduto ?? '0', 10)) {
      this.dialogService.open(ErrorComponent, {
        width: '300px',
        height: '300px',
        data: this.data
      })
    } else {
      const quantidadeAtual: number = parseInt(this.data.quantidadeProduto ?? '0', 10) - parseInt(this.sellProductForm.value.quantidadeProduto ?? '0', 10);
      this.sellProductForm.value.quantidadeProduto = quantidadeAtual.toString();
      console.log(this.sellProductForm.value.quantidadeProduto);
      this.productService.putProduct(this.data.produtoId, this.sellProductForm.value as Product).pipe(
        takeUntil(this.destroy$)
      ).subscribe();

      this.dialogService.open(SuccessComponent, {
        width: '300px',
        height: '300px'
      });
      this.dialogRef.close();
    }
  }

  recarregarPagina(): void{
    window.location.reload();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
