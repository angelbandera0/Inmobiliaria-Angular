import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { LoginInfo } from '../models/login-info.model';
import { LoginInfoGoogle } from '../models/login-info-google.model';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private userSubject!: BehaviorSubject<User>;
  public user: Observable<User>;
  private refreshTokenTimeout: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private cookieService: CookieService
  ) {
    this.userSubject = new BehaviorSubject<User>(null as any);
    this.user = this.userSubject.asObservable();
  }

  signIn(credentials: FormData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${environment.server}/auth/login`,
      credentials
    );
  }

  signInWithGoogle(credentials: LoginInfoGoogle): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${environment.server}/auth/google`,
      credentials,
      httpOptions
    );
  }
  solicitarLinkSetPassword(data: FormData): Observable<any> {
    return this.http.post<any>(
      `${environment.server}/auth/requestsetpassword`,
      data
    );
  }
  changePassword(token: string | null, data: FormData): Observable<any> {
    let params = new HttpParams().append('token', `${token}`);
    return this.http.post<any>(
      `${environment.server}/auth/resetpassword`,
      data,
      {
        params,
      }
    );
  }
  resendCorfirmationEmail(data: FormData): Observable<any> {
    return this.http.post<any>(`${environment.server}/auth/resendemail`, data);
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(data: FormData) {
    return this.http
      .post<any>(`${environment.server}/auth/login`, data, {
        withCredentials: true,
      })
      .pipe(
        map((user) => {
          this.userSubject.next(user);
          this.startRefreshTokenTimer();
          return user;
        })
      );
  }

  logout() {
    this.http
      .post<any>(
        `${environment.server}/users/revoke-token`,
        {},
        { withCredentials: true }
      )
      .subscribe();
    this.stopRefreshTokenTimer();
    this.userSubject.next(null as any);
    this.cookieService.delete('refreshToken');
    this.router.navigate(['/auth/login']);
  }

  refreshToken() {
    return this.http
      .post<any>(
        `${environment.server}/users/refresh-token`,
        {},
        { withCredentials: true }
      )
      .pipe(
        map((user) => {
          this.userSubject.next(user);
          this.startRefreshTokenTimer();
          return user;
        })
      );
  }

  // helper methods

  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(this.userValue.token.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;

    this.refreshTokenTimeout = setTimeout(
      () => this.refreshToken().subscribe(),
      timeout
    );
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
