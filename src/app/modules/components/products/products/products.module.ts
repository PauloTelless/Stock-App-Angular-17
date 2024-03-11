import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PaginatorModule } from 'primeng/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TableModule } from 'primeng/table';
import { ProductFormComponent } from '../components/product-form/product-form.component';
import { ToolBarComponent } from '../../../../shared/tool-bar/tool-bar.component';
import { CategoryService } from '../../../../services/categories/category.service';
import { ProductService } from '../../../../services/products/product.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    ToolBarComponent,
    ProductFormComponent,
    TableModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    PaginatorModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers:[
    ProductService,
    CategoryService
  ],
})
export class ProductsModule { }
