import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-time-out-logged',
  standalone: true,
  imports: [
    MatIconModule
  ],
  templateUrl: './time-out-logged.component.html',
  styleUrl: './time-out-logged.component.sass'
})
export class TimeOutLoggedComponent implements OnInit{
  ngOnInit(): void {
    this.recarregarPagina();
  }

  recarregarPagina(){
    setTimeout(() => {
      window.location.reload()
    }, 2500);
  }

}
