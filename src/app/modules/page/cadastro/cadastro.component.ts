import { PostUser } from './../../../models/user/postUser';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatCardModule } from '@angular/material/card';

import { Component, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';

import { MatInputModule } from '@angular/material/input';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.sass'
})

export class CadastroComponent {
  private formBuilder = inject(FormBuilder);
  private userService = inject(AuthService);
  private routerServicer = inject(Router);

  createUserForm = this.formBuilder.group({
    nomeUsuario: ['', Validators.required],
    emailUsuario: ['', Validators.required],
    senha: ['', Validators.required],
    confirmarSenha: ['', Validators.required]
  });

  handleCreateUser(): void{
    if (this.createUserForm.value && this.createUserForm.valid) {
      this.userService.postUser(this.createUserForm.value as PostUser).subscribe({
        next: (response) => {
          console.log(response);
          this.routerServicer.navigate(['/login'])
        },
        error: (err) => {
          console.log(err)
        }

      });
    };
  };

}
