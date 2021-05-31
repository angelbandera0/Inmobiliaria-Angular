import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class VentaService {
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
  getVentas(): Observable<any> {
    return this.http.get<any>(
      `${environment.server}/vendidas`,
      this.httpOptions
    );
  }
  getVentaById(id: string): Observable<any> {
    return this.http.get<any>(
      `${environment.server}/vendidas/${id}`,
      this.httpOptions
    );
  }
  deleteVenta(id: string): Observable<any> {
    return this.http.delete<any>(
      `${environment.server}/vendidas/${id}`,
      this.httpOptions
    );
  }
  putVenta(id: string, data: FormData): Observable<any> {
    return this.http.put<any>(
      `${environment.server}/vendidas/${id}`,
      data,
      this.httpOptions
    );
  }
}
