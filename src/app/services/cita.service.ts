import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CitaService {
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
  addCita(data: FormData): Observable<any> {
    return this.http.post<any>(
      `${environment.server}/cita`,
      data,
      this.httpOptions
    );
  }
  getCitas(estado: string): Observable<any> {
    this.httpOptions.params = new HttpParams().append('estado', `${estado}`);
    //const params = new HttpParams().append('estado', `${estado}`);
    return this.http.get<any>(`${environment.server}/cita`, this.httpOptions);
  }
  getCitaById(id:string):Observable<any>{
    return this.http.get<any>(`${environment.server}/cita/${id}`,this.httpOptions);
  }
  deleteCita(id:string):Observable<any>{
    return this.http.delete<any>(`${environment.server}/cita/${id}`,this.httpOptions);
  }
  aprobarCita(id:string,data:FormData): Observable<any>{
    return this.http.post<any>(`${environment.server}/cita/citaConfirm/${id}`,data,this.httpOptions);
  }
}
