import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
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

  createSolicitud(data: FormData): Observable<any> {
    return this.http.post<any>(
      `${environment.server}/solicitud`,
      data,
      this.httpOptions
    );
  }
  getSolicitudes(estado: string): Observable<any> {
    this.httpOptions.params = new HttpParams().append('estado', `${estado}`);
    //const params = new HttpParams().append('estado', `${estado}`);
    return this.http.get<any>(`${environment.server}/solicitud`, this.httpOptions);
  }
  getSolicitudById(id:string): Observable<any>{
    return this.http.get<any>(`${environment.server}/solicitud/${id}`,this.httpOptions);
  }
  deleteSolicitud(id:string):Observable<any>{
    return this.http.delete<any>(`${environment.server}/solicitud/${id}`,this.httpOptions);
  }
  aprobarSolicitud(id:string,data:FormData):Observable<any>{
    return this.http.post<any>(`${environment.server}/solicitud/aprobar/${id}`,data,this.httpOptions);
  }
  updateSolicitud(id: string, data: FormData): Observable<any> {
    return this.http.put<any>(
      `${environment.server}/solicitud/${id}`,
      data,
      this.httpOptions
    );
  }
}
