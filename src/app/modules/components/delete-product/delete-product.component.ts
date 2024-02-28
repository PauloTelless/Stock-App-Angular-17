import { ProductService } from '../../../services/products/product.service';
import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button'
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-delete-product',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule
  ],
  providers: [
    ProductService
  ],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.sass'
})

export class DeleteProductComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) { }

  private routerService = inject(Router);
  private dialogService = inject(MatDialog);
  private productService = inject(ProductService);
  private destroy$ = new Subject<void>;

  deleteProduct(){
    this.productService.deleteProduct(this.data).pipe(
      takeUntil(
        this.destroy$
      )
    ).subscribe();
    this.dialogService.closeAll();
    this.routerService.navigate(['/dashboard'])
  }

  cancelDeleteProduct(){
    this.dialogService.closeAll();
  }

}
