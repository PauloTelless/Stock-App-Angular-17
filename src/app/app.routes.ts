import { Routes } from '@angular/router';
import { LoginComponent } from './modules/components/users/page/login/login.component';
import { CadastroComponent } from './modules/components/users/page/cadastro/cadastro.component';
import { DashboardComponent } from './modules/components/dashboard/dashboard.component';
import { ProductComponent } from './modules/components/products/page/product-table/product.component';
import { CategoryComponent } from './modules/components/categories/page/category-table/category.component';
import { SellComponent } from './modules/components/sell/page/sell/sell.component';

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
  },
  {
    path: 'sell',
    component: SellComponent
  }
];
