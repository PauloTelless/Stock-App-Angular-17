import { MatIconModule } from '@angular/material/icon';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../../../../services/auth/auth.service';
import { DeleteUserSuccessComponent } from '../delete-user-success/delete-user-success.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatDialogModule
  ],
  providers:[
    AuthService
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.sass'
})

export class LoginFormComponent implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}

  private dialogService = inject(MatDialog);
  private userName = (this.data as string).toLowerCase();
  private userService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef);

  ngOnInit(): void {
    console.log(this.data)
  };

  formLogin = this.formBuilder.group({
    userName: this.userName,
    password: ['', Validators.required]
  });

  loginFormSubmit(){
    this.userService.deleteUser(this.userName).subscribe({
      next: (() => {
        localStorage.removeItem('token');
        this.dialogService.open(DeleteUserSuccessComponent, {
          width: '300px',
          height: '300px'
        });
      }),
      error: (err) => {
        console.log(err)
      }
    });
  };

  recarregarPagina(){
    this.dialogRef.close();
    window.location.reload();
  };

}
