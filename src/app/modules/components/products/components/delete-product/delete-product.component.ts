import { ProductService } from '../../../../../services/products/product.service';
import { Component, Inject, inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
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

  private dialogService = inject(MatDialog);
  private productService = inject(ProductService);
  private destroy$ = new Subject<void>;

  deleteProduct(){
    this.productService.deleteProduct(this.data.produtoId).pipe(
      takeUntil(
        this.destroy$
        )
        ).subscribe();

        this.dialogService.closeAll();
        this.recarregarPagina();
      }

      cancelDeleteProduct(){
        this.dialogService.closeAll();
      }

      recarregarPagina() {
        window.location.reload();
      }

      ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
      }
}
