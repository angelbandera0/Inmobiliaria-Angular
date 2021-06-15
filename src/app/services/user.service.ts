import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginService } from './login.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpOptions!: any;
  token: any;
  constructor(
    private http: HttpClient,
    private loginService:LoginService
  ) {
    this.token = this.loginService.userValue?.token;
    this.httpOptions = {
      headers: new HttpHeaders({ 'x-token': this.token }),
    };
  }
  createUser(data: FormData): Observable<any> {
    return this.http.post<any>(`${environment.server}/users`, data);
  }
  userById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.server}/users/${id}`,this.httpOptions  );
  }
  userAgregaciones(id: string): Observable<any> {
    return this.http.get<any>(`${environment.server}/users/agregaciones/${id}`);
  }
  misLikes(): Observable<any> {
    return this.http.get<any>(`${environment.server}/users/favoritas`,this.httpOptions);
  }
  userPut(id: string, data: FormData): Observable<any> {
    return this.http.put<any>(`${environment.server}/users/${id}`, data);
  }
}
