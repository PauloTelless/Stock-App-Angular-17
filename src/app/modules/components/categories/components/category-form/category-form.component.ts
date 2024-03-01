import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../../../services/categories/category.service';
import { Category } from '../../../../../models/category/category';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';

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

export class CategoryFormComponent implements OnDestroy{
  constructor(){}

  private destroy$ = new Subject<void>;
  private dialogService = inject(MatDialogRef)
  private categoryService = inject(CategoryService);
  private formBuilder = inject(FormBuilder);

  createCategoryForm = this.formBuilder.group({
    nomeCategoria: ['', Validators.required]
  })

  createCategoryFormSubmit(): void{
    if (this.createCategoryForm.valid && this.createCategoryForm.value) {
      this.categoryService.postCategory(this.createCategoryForm.value as Category).pipe(
        takeUntil(
          this.destroy$
        )
      ).subscribe();
      this.recarregarPagina();
      this.dialogService.close();
    }
  }

  recarregarPagina(): void{
    window.location.reload();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
