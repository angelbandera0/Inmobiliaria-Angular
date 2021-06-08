import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirnmAccountComponent } from './confirnm-account/confirnm-account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
@NgModule({
  declarations: [LoginComponent, RegisterComponent, ResetPasswordComponent, ConfirnmAccountComponent, ChangePasswordComponent],
  imports: [CommonModule, AuthRoutingModule, SocialLoginModule, FormsModule,ReactiveFormsModule],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '767767601506-k588irla2mtd18uvut6ej0ha8g0lbgpt.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
})
export class AuthModule {}
