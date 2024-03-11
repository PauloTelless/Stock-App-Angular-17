import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { DASHBOARD_ROUTES } from '../dashboard.routing';
import { CategoryService } from '../../../../services/categories/category.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChartModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(DASHBOARD_ROUTES)
  ],
  providers:[
    CategoryService
  ]
})
export class DashboardModule { }
