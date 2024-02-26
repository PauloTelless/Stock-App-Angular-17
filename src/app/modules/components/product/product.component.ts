import { Component, OnInit, inject } from '@angular/core';
import { ToolBarComponent } from '../../shared/components/tool-bar/tool-bar.component';
import { TableModule } from 'primeng/table';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { product } from '../../../models/products/product';
import { ProductService } from '../../../services/product.service';
import { MatDialogModule, MatDialog } from '@angular/material/dialog'
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    ToolBarComponent,
    ProductFormComponent,
    TableModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.sass'
})
export class ProductComponent implements OnInit{
  private dialogRef = inject(MatDialog);

  ngOnInit(): void {
    this.getAllProducts();
  }
  public productDatas !: Array<product>
  private productService = inject(ProductService);

  getAllProducts(){
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.productDatas = response;
      }
    });
  };

  openModalProductForm(){
    this.dialogRef.open(ProductFormComponent, {
      width: '500px',
      height: '600px'
    })
  }

  displayedColumns: string[] = ['nome', 'descricao', 'quantidade', 'preco', 'acoes'];
}
