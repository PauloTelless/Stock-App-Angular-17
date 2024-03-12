import { Routes } from '@angular/router';
import { LoginComponent } from './modules/components/users/page/login/login.component';
import { CadastroComponent } from './modules/components/users/page/cadastro/cadastro.component';
import { ProductComponent } from './modules/components/products/page/product-table/product.component';
import { CategoryComponent } from './modules/components/categories/page/category-table/category.component';
import { SellComponent } from './modules/components/sell/page/sell/sell.component';
import { authGuard } from './guards/auth-guard.guard';
import { UserComponent } from './modules/components/users/page/user/page/user.component';
import { DashboardComponent } from './modules/components/dashboard/page/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    title: 'Login',
    path: 'login',
    component: LoginComponent
  },
  {
    title: 'Cadastro',
    path: 'cadastro',
    component: CadastroComponent
  },
  {
    title: 'Dashboard',
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    title: 'Produtos',
    path: 'products',
    component: ProductComponent,
    canActivate: [authGuard]
  },
  {
    title: 'Categorias',
    path: 'categories',
    component: CategoryComponent,
    canActivate: [authGuard]
  },
  {
    title: 'Vendas',
    path: 'sell',
    component: SellComponent,
    canActivate: [authGuard]
  },
  {
    title: 'Usuário',
    path: 'user',
    component: UserComponent,
    canActivate: [authGuard]
  }
];
