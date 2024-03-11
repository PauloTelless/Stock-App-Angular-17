import { ProductService } from '../../../../../services/products/product.service';
import { Component, Inject, inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'
import { Subject, takeUntil } from 'rxjs';
import { MatTooltip } from '@angular/material/tooltip'
import { SuccessComponent } from './success/success.component';

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

  private dialogRef = inject(MatDialogRef);
  private dialogService = inject(MatDialog);
  private productService = inject(ProductService);
  private destroy$ = new Subject<void>;

  deleteProduct(): void{
    this.productService.deleteProduct(this.data.produtoId).pipe(
      takeUntil(
        this.destroy$
        )
        ).subscribe();
        this.dialogRef.close();
        this.dialogService.open(SuccessComponent, {
          width: '300px',
          height: '300px'
        });
      };

      cancelDeleteProduct(): void{
        this.dialogRef.close();
      };

      ngOnDestroy(): void{
        this.destroy$.next();
        this.destroy$.complete();
      };
}
