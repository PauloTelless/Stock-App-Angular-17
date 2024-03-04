import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../../../../models/products/product';
import { MatIconModule} from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-error-product-form',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './error.component.html',
  styleUrl: './error.component.sass'
})
export class ErrorComponent {
  private dialogService = inject(MatDialogRef);

  closeModalError(){
    this.dialogService.close()
  }
}
