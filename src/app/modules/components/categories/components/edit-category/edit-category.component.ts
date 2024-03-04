import { Component, Inject, OnDestroy, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../../../services/categories/category.service';
import { Category } from '../../../../../models/category/category';
import { Subject, takeUntil } from 'rxjs';
import { MatTooltip } from '@angular/material/tooltip'
import { SuccessComponent } from './success/success.component';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTooltip
  ],
  providers:[
    CategoryService
  ],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.sass'
})
export class EditCategoryComponent implements OnDestroy{
  constructor(@Inject(MAT_DIALOG_DATA) public data:any ){}

  public categoriaId = this.data.categoriaId;
  public category = this.data;
  private destroy$ = new Subject<void>;
  private categoryService = inject(CategoryService);
  private formBuilder = inject(FormBuilder);
  private dialogService = inject(MatDialog);
  private dialogRef = inject(MatDialogRef);

  editCategoryForm = this.formBuilder.group({
    nomeCategoria: this.category.categoria.nomeCategoria
  })

  putCategorySubmit(): void{
    this.categoryService.putCategory(this.categoriaId, this.editCategoryForm.value as Category).pipe(
      takeUntil(
        this.destroy$
      )
    ).subscribe({
      next: () => {
        this.dialogRef.close();
        this.dialogService.open(SuccessComponent, {
          width: '300px',
          height: '300px'
        })
      },
      error: (err) => {
      console.log(err)
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
