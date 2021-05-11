import { Routes } from '@angular/router';

export const CMS_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('../modules/cms/cms.module').then(m => m.CmsModule),
    },
  ];
