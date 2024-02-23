import { Component } from '@angular/core';
import { ToolBarComponent } from '../../shared/components/tool-bar/tool-bar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ToolBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.sass'
})
export class DashboardComponent {

}
