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
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent implements OnInit, OnDestroy{
  constructor(){}

  private destroy$ = new Subject<void>;
  private routerService = inject(Router)
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  public usersDatas !: Array<user>;

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
        this.routerService.navigate(['/dashboard']);
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
