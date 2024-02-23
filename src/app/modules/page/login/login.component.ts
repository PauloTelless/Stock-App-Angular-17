import { Component, inject } from '@angular/core';

import { MatCardModule } from '@angular/material/card';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'

import { MatButtonModule } from '@angular/material/button'
import { Router } from '@angular/router';

import { ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';



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
export class LoginComponent {
  private routerService = inject(Router)
  private formBuilder = inject(FormBuilder);


  formLogin = this.formBuilder.group({
    user: ['', Validators.required],
    password: ['', Validators.required]
  })

  formLoginSubmit(){
    if (this.formLogin.value && this.formLogin.valid) {
      console.log(`user: ${this.formLogin.value.user}/password: ${this.formLogin.value.password}`)
      this.routerService.navigate(['/dashboard'])
    }
  }

  redirectToRegister(){
    this.routerService.navigate(['/cadastro'])
  }
}
