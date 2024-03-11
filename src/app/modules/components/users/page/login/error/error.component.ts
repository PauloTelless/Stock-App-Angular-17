import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../../../../models/products/product';
import { MatIconModule} from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-error-login',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './error.component.html',
  styleUrl: './error.component.sass'
})
export class ErrorComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Product){}
  private dialogService = inject(MatDialogRef);

  closeModalError(){
    this.dialogService.close()
  };
}
