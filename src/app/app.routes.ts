import { Routes } from '@angular/router';
import { LoginComponent } from './modules/page/login/login.component';
import { CadastroComponent } from './modules/page/cadastro/cadastro.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cadastro',
    component: CadastroComponent
  }
];
