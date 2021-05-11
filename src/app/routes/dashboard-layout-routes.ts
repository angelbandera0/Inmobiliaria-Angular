import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('../modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    },
  ];
