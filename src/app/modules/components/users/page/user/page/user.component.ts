import { Component, OnInit, inject } from '@angular/core';
import { ToolBarComponent } from '../../../../../../shared/tool-bar/tool-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserDeleteComponent } from '../user-delete/user-delete.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    ToolBarComponent,
    MatButtonModule,
    MatCardModule,
    MatIcon,
    UserDeleteComponent,
    MatDialogModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.sass'
})
export class UserComponent implements OnInit{

  private dialogService = inject(MatDialog);
  public userName!: string

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName')?.toUpperCase() as string;
  }

  openModalDeleteUser(){
    this.dialogService.open(UserDeleteComponent, {
      width: '300px',
      height: '300px',
      data: this.userName
    })
  }
}
