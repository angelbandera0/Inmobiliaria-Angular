import { Routes } from '@angular/router';

export const ERROR_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('../modules/error/error.module').then(m => m.ErrorModule),
    },
  ];
