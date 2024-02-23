import { Component } from '@angular/core';
import { ToolBarComponent } from '../../shared/components/tool-bar/tool-bar.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    ToolBarComponent
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.sass'
})
export class CategoryComponent {

}
