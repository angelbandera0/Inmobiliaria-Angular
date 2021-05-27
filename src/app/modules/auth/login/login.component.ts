import { ResponseGoogleLogin } from './../../../models/response-google-login.model';
import { Roles } from './../../../enums/roles.enum';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';
import { LoginInfo } from 'src/app/models/login-info.model';
import { LoginService } from 'src/app/services/login.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { LoginInfoGoogle } from 'src/app/models/login-info-google.model';

// Declaro las variables de jQuery
declare var activee: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: SocialUser = new SocialUser();
  loggedIn = false;
  loginForm!: FormGroup;
  loading = false;
  isLoggedIn = false;
  isLoggedFailed = false;
  errorMessage = '';
  existError = false;
  errorsList: Array<string> = [];
  roles: string[] = [];
  private loginInfo!: LoginInfo;
  show = false;

  constructor(
    private authServiceSocial: SocialAuthService,
    private loginService: LoginService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  // tslint:disable-next-line: typedef
  ngOnInit() {
    activee($);
    // tslint:disable-next-line: deprecation
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    this.authServiceSocial.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.errorsList = [];
    this.existError = false;
    const formData = new FormData();
    formData.append('email', this.loginForm.get('email')?.value);
    formData.append('password', this.loginForm.get('password')?.value);
    console.log(formData.get('email'));
    console.log(formData.get('password'));

    // tslint:disable-next-line: deprecation
    this.loginService.signIn(formData).subscribe({
      next: (res) => {
        console.log(res.user.rol?.rol);
        this.tokenStorage.saveToken(res.token);
        this.tokenStorage.saveId(res.user.uid);
        this.tokenStorage.saveUsername(res.user.name);
        this.tokenStorage.saveAuthorities(res.user.rol.rol);
        console.log(Roles.USER_ROLE.toString());
        this.loading = false;
        if (Roles.USER_ROLE.toString() === res.user.rol.rol) {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      complete: () => {
        this.loading = false;
      },
      error: (res) => {
        if (!res.error.msg) {
          this.errorsList.push(res.error.errors[0].msg);
        } else {
          this.errorsList.push(res.error.msg);
        }
        this.existError = true;
        this.loading = false;
      },
    });
  }

  signInWithGoogle(): void {
    this.authServiceSocial
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((respose: ResponseGoogleLogin) => {
        console.log(respose);
        const lig: LoginInfoGoogle = new LoginInfoGoogle(respose.idToken);
        // tslint:disable-next-line: deprecation
        this.loginService.signInWithGoogle(lig).subscribe({
          next: (res) => {
            console.log(res);
            this.tokenStorage.saveToken(res.token);
            this.tokenStorage.saveId(res.user.uid);
            this.tokenStorage.saveUsername(res.user.name);
            this.tokenStorage.saveAuthorities(res.user.rol.rol);
            console.log(window.sessionStorage);
            if (Roles.USER_ROLE.toString() === res.user.rol.rol) {
              this.router.navigate(['/']);
            } else {
              this.router.navigate(['/dashboard']);
            }
          },
          complete: () => {},
          error: (error) => {
            console.log(error);
            this.errorMessage = error.error.message;
            this.isLoggedFailed = true;
            this.loading = false;
          },
        });
      });
  }

  signOut(): void {
    this.authServiceSocial.signOut();
  }

  refreshToken(): void {
    this.authServiceSocial.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
  get getControl() {
    return this.loginForm.controls;
  }
}
