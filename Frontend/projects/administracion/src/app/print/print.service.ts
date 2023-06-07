import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  

  url = environment.API_URL;
  constructor(private http:HttpClient) { }


  getResumido(): Observable<string> { 
    return this.http.get(this.url+'/resumido',{ responseType: 'text'});  
  } 
  getDetalle(): Observable<string> { 
    return this.http.get(this.url+'/detalle',{ responseType: 'text'});  
  } 
}
