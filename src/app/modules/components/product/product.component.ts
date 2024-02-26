import { Component, OnInit, inject } from '@angular/core';
import { ToolBarComponent } from '../../shared/components/tool-bar/tool-bar.component';
import { TableModule } from 'primeng/table';
import {MatButtonModule} from '@angular/material/button';
import { product } from '../../../models/products/product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    ToolBarComponent,
    TableModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.sass'
})
export class ProductComponent implements OnInit{
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
};
