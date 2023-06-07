import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  url = environment.API_URL + '/user';

  constructor(private http: HttpClient) { }

  getAllUser(): Observable<Usuario> {
    return this.http.get<Usuario>(this.url);
  }
}
