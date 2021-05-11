import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { LoginInfo } from '../models/login-info.model';
import { LoginInfoGoogle } from '../models/login-info-google.model';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

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
  /*singUp(info: FormData): Observable<string> {
    return this.http.post<string>(
      `${this.url}auth/register`,
      info,
      httpOptions
    );
  }*/
}
