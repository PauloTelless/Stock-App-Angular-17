import { Component } from '@angular/core';
import { ToolBarComponent } from '../../shared/components/tool-bar/tool-bar.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    ToolBarComponent
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.sass'
})
export class ProductComponent {

}
