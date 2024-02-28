import { Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../../services/categories/category.service';
import { Category } from '../../../../models/category/category';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
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

  private destroy$ = new Subject<void>;
  private categoryService = inject(CategoryService);
  private formBuilder = inject(FormBuilder);
  public category = this.data;
  public categoriaId = this.data.categoriaId

  editCategoryForm = this.formBuilder.group({
    nomeCategoria: this.category.categoria.nomeCategoria
  })

  putCategorySubmit(): void{
    this.categoryService.putCategory(this.categoriaId, this.editCategoryForm.value as Category).pipe(
      takeUntil(
        this.destroy$
      )
    ).subscribe({
      next: (response) => {
        console.log(response)
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
