import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../../../services/categories/category.service';
import { Category } from '../../../../../models/category/category';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil, Observable } from 'rxjs';
import { SuccessComponent } from './success/success.component';

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
  private dialogRef = inject(MatDialogRef);
  private dialogService = inject(MatDialog);
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
      this.dialogRef.close();
      this.dialogService.open(
        SuccessComponent, {
          width: '300px',
          height: '300px'
        }
      )
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
