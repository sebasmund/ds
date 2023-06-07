import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Response } from 'projects/tools/src/lib/response';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PiezasService {

  url = environment.API_URL;

  constructor(private http: HttpClient) { }


  
  getPieza(): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/pieza');
  }
  updateOdon(data:any): Observable<Response> {
    return this.http.put<Response>(this.url + '/updatepieza',data);

  }
}
