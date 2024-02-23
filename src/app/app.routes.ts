import { Routes } from '@angular/router';
import { LoginComponent } from './modules/page/login/login.component';
import { CadastroComponent } from './modules/page/cadastro/cadastro.component';
import { DashboardComponent } from './modules/components/dashboard/dashboard.component';
import { ProductComponent } from './modules/components/product/product.component';
import { CategoryComponent } from './modules/components/category/category.component';

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
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'products',
    component: ProductComponent
  },
  {
    path: 'categories',
    component: CategoryComponent
  }
];
