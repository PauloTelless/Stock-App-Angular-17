import { ProductService } from './../../../services/product.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button'
import { Router } from '@angular/router';

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
  constructor(@Inject(MAT_DIALOG_DATA) public data: string, private productService: ProductService, private routerService: Router, private dialogService: MatDialog) { }

  deleteProduct(){
    console.log(this.data)
    this.productService.deleteProduct(this.data).subscribe();
    this.dialogService.closeAll();
    this.routerService.navigate(['dashboard'])
  }

  cancelDeleteProduct(){
    this.dialogService.closeAll();
  }

}
