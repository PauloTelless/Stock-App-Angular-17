import { ProductService } from '../../../../../services/products/product.service';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'
import { Router } from '@angular/router';
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

export class DeleteProductComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {

  }

  private routerService = inject(Router);
  private dialogService = inject(MatDialog);
  private productService = inject(ProductService);
  private destroy$ = new Subject<void>;

  deleteProduct(){
    this.productService.deleteProduct(this.data.produtoId).pipe(
      takeUntil(
        this.destroy$
      )
    ).subscribe(() => this.routerService.navigate(['/products']));

    this.dialogService.closeAll();
    this.recarregarPagina();
  }

  cancelDeleteProduct(){
    this.dialogService.closeAll();
  }

  recarregarPagina() {
    window.location.reload();
  }

}
