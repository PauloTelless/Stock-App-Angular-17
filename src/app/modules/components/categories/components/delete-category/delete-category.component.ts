import { Component, Inject, OnDestroy, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CategoryService } from '../../../../../services/categories/category.service';
import { MatButtonModule } from '@angular/material/button';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-delete-category',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule
  ],
  providers:[
    CategoryService
  ],
  templateUrl: './delete-category.component.html',
  styleUrl: './delete-category.component.sass'
})
export class DeleteCategoryComponent implements OnDestroy{
  constructor(@Inject(MAT_DIALOG_DATA) public data: string){}

  private destroy$ = new Subject<void>;
  private categorieService = inject(CategoryService);
  private dialogService = inject(MatDialog)

  deleteCategory(){
    this.categorieService.deleteCategory(this.data).pipe(
      takeUntil(
        this.destroy$
      )
    ).subscribe(() => console.log(this.data));
   this.recarregarPagina();
   this.dialogService.closeAll();
  }

  closeModalCategoryDelete(){
    this.dialogService.closeAll();
  }

  recarregarPagina(){
    window.location.reload();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
