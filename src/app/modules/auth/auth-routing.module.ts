import { ChangePasswordComponent } from './change-password/change-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginGuard } from './../../guards/login.guard';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirnmAccountComponent } from './confirnm-account/confirnm-account.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent,canActivate: [LoginGuard], },
  { path: 'register', component: RegisterComponent },
  { path: 'confirmaccount/:id', component: ConfirnmAccountComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: 'changepassword', component: ChangePasswordComponent },
  //{ path: '**', redirectTo: '/error/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
