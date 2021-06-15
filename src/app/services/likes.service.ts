import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  httpOptions!: any;
  token: any;

  constructor(
    private http: HttpClient,
    private loginService:LoginService
  ) {
    this.token = this.loginService.userValue?.token;
  }


  addLike(data: FormData): Observable<any> {
    this.token = this.loginService.userValue?.token;
    this.httpOptions = {
      headers: new HttpHeaders({ 'x-token': this.token }),
    };
    return this.http.post<any>(
      `${environment.server}/like`,
      data,
      this.httpOptions
    );
  }
  removeLike(id: string): Observable<any> {
    this.token = this.loginService.userValue?.token;
    this.httpOptions = {
      headers: new HttpHeaders({ 'x-token': this.token }),
    };
    return this.http.delete<any>(
      `${environment.server}/like/${id}`,
      this.httpOptions
    );
  }
}
