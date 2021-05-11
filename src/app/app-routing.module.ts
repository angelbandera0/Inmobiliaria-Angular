import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { AUTH_ROUTES } from './routes/auth-layout-routes';
import { CMS_ROUTES } from './routes/cms-layout-routes';
import { DASHBOARD_ROUTES } from './routes/dashboard-layout-routes';
import { CmsComponent } from './layouts/cms/cms.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: CmsComponent, children: CMS_ROUTES },
  { path: 'dashboard', component: DashboardComponent, children: DASHBOARD_ROUTES },
  { path: 'auth', component: AuthComponent, children: AUTH_ROUTES },
  { path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
