import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CitaService {
  httpOptions!: any;
  token: any;

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {
    this.token = this.tokenStorageService.getToken();
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
}
