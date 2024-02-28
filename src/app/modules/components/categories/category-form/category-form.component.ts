import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../../services/categories/category.service';
import { Category } from '../../../../models/category/category';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers:[
    CategoryService
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.sass'
})

export class CategoryFormComponent{
  constructor(){}

  private dialogService = inject(MatDialog)
  private routerService = inject(Router);
  private categoryService = inject(CategoryService);
  private formBuilder = inject(FormBuilder);

  createCategoryForm = this.formBuilder.group({
    nomeCategoria: ['', Validators.required]
  })

  createCategoryFormSubmit(){
    if (this.createCategoryForm.valid && this.createCategoryForm.value) {
      this.categoryService.postCategory(this.createCategoryForm.value as Category)
      .subscribe(() => this.routerService.navigate(['/categories']))
      this.dialogService.closeAll();
    }
  }
}
