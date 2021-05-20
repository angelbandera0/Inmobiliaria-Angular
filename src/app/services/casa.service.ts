import { GetCasaResponse } from './../models/get-casa-response.model';
import { ListadoCasaResponse } from './../models/listado-casa-response.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CasaService {
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

  createCasa(data: FormData): Observable<any> {
    return this.http.post<any>(
      `${environment.server}/casa`,
      data,
      this.httpOptions
    );
  }

  listCasas(): Observable<ListadoCasaResponse> {
    return this.http.get<ListadoCasaResponse>(`${environment.server}/casa`);
  }
  deleteCasa(id: string): Observable<any> {
    return this.http.delete<any>(
      `${environment.server}/casa/${id}`,
      this.httpOptions
    );
  }
  updateCasa(id: string, data: FormData): Observable<any> {
    return this.http.put<any>(
      `${environment.server}/casa/${id}`,
      data,
      this.httpOptions
    );
  }
  getCasaById(id: string): Observable<GetCasaResponse> {
    return this.http.get<GetCasaResponse>(`${environment.server}/casa/${id}`);
  }
  buscarCasas(
    data: FormData,
    desde: number = 0,
    limite: number = 5
  ): Observable<any> {
    let params = new HttpParams()
      .append('desde', `${desde}`)
      .append('limite', `${limite}`);
    return this.http.post<any>(`${environment.server}/casa/buscar`, data, {
      params,
    });
  }
}
