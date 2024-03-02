import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { user } from '../../../../../models/user/user';
import { AuthService } from '../../../../../services/auth/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SuccessComponent } from './success/success.component';
import { ErrorComponent } from './error/error.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent implements OnInit, OnDestroy{
  constructor(){}

  private destroy$ = new Subject<void>;
  public usersDatas !: Array<user>;
  private routerService = inject(Router)
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private dialogService = inject(MatDialog)

  ngOnInit(): void {
    this.getAllUsers();
  }

  formLogin = this.formBuilder.group({
    nomeUsuario: ['', Validators.required],
    senha: ['', Validators.required]
  })

  formLoginSubmit() {
    if (this.formLogin.value && this.formLogin.valid && this.usersDatas) {
      const nomeUsuario = this.formLogin.value.nomeUsuario;
      const userExists = this.usersDatas.some(userData => userData.nomeUsuario === nomeUsuario);

      if (userExists) {
        this.dialogService.open(SuccessComponent, {
          width: '300px',
          height: '300px',
        })
        this.routerService.navigate(['/dashboard']);
      } else{
        this.dialogService.open(ErrorComponent, {
          width: '300px',
          height: '300px'
        })
      }
    }
  }

  getAllUsers() {
    this.authService.getAllUsers().pipe(
      takeUntil(
        this.destroy$
      )
    ).subscribe({
      next: (response => {
        this.usersDatas = response
      })
    })
  }

  redirectToRegister(){
    this.routerService.navigate(['/cadastro'])
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
