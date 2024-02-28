import { Component, Inject, OnDestroy, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../../../services/categories/category.service';
import { Category } from '../../../../../models/category/category';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers:[
    CategoryService
  ],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.sass'
})
export class EditCategoryComponent implements OnDestroy{
  constructor(@Inject(MAT_DIALOG_DATA) public data:any ){}

  public categoriaId = this.data.categoriaId
  public category = this.data;
  private destroy$ = new Subject<void>;
  private categoryService = inject(CategoryService);
  private formBuilder = inject(FormBuilder);
  private dialogService = inject(MatDialog)

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
        this.dialogService.closeAll();
        this.recarregarPagina();
      },
      error: (err) => {
      console.log(err)
      }
    })
  }

  recarregarPagina(){
    window.location.reload();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
