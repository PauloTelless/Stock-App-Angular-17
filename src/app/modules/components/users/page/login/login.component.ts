import { Component, OnDestroy, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../../services/auth/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SuccessComponent } from './success/success.component';
import { ErrorComponent } from './error/error.component';
import { User } from '../../../../../models/user/user';
import { TokenResponse } from '../../../../../models/user/token';
import { ToolBarComponent } from '../../../../../shared/tool-bar/tool-bar.component';

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
    MatDialogModule,
    ToolBarComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent implements OnDestroy{
  constructor(){}

  public logoutInfo !: string;
  private destroy$ = new Subject<void>;
  public usersDatas !: Array<User>;
  private routerService = inject(Router)
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private dialogService = inject(MatDialog)

  formLogin = this.formBuilder.group({
    userName: ['', Validators.required],
    password: ['', Validators.required]
  })

  formLoginSubmit() {
    if (this.formLogin.valid) {
      this.authService.loginUser(this.formLogin.value as User).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: (response: TokenResponse) => {
          localStorage.setItem('token', response.token);
          this.logoutInfo = response.token;
          this.dialogService.open(SuccessComponent, { width: '300px', height: '300px' });
          this.routerService.navigate(['/dashboard']);
        },
        error: () => {
          this.dialogService.open(ErrorComponent, { width: '300px', height: '300px' });
        }
      });
    }
  }

  redirectToRegister(){
    this.routerService.navigate(['/cadastro'])
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}

