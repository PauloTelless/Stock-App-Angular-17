import { ProductService } from '../../../../../services/products/product.service';
import { Component, Inject, inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'
import { Subject, takeUntil } from 'rxjs';
import { MatTooltip } from '@angular/material/tooltip'

@Component({
  selector: 'app-delete-product',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatTooltip
  ],
  providers: [
    ProductService
  ],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.sass'
})

export class DeleteProductComponent implements OnDestroy{
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  private dialogService = inject(MatDialogRef);
  private productService = inject(ProductService);
  private destroy$ = new Subject<void>;

  deleteProduct(): void{
    this.productService.deleteProduct(this.data.produtoId).pipe(
      takeUntil(
        this.destroy$
        )
        ).subscribe();

        this.dialogService.close();
        this.recarregarPagina();
      }

      cancelDeleteProduct(): void{
        this.dialogService.close();
      }

      recarregarPagina(): void{
        window.location.reload();
      }

      ngOnDestroy(): void{
        this.destroy$.next();
        this.destroy$.complete();
      }
}
