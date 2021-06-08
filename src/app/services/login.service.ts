import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
}
