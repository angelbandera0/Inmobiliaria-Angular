import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  createUser(data: FormData): Observable<any> {
    return this.http.post<any>(
      `${environment.server}/users`,
      data
      );
  }
  userById(id:string):Observable<any>{
    return this.http.get<any>(
      `${environment.server}/users/${id}`
      );
  }
  userAgregaciones(id:string): Observable<any>{
    return this.http.get<any>(`${environment.server}/users/agragaciones/${id}`);
  }
}
