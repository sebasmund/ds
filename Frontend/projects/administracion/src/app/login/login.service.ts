import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { respuesta, UsuarioRes } from "../../../../tools/src/lib/usuario";
import { BehaviorSubject, Observable } from "rxjs";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  url = environment.API_URL+'/user/login';

  public usuarioSubject: BehaviorSubject<UsuarioRes>;
  public usuario: Observable<UsuarioRes>;

  public get usuarioData(): UsuarioRes {
    return this.usuarioSubject.value;
  }

  constructor(private http: HttpClient) {

    this.usuarioSubject = new BehaviorSubject<UsuarioRes>(JSON.parse(localStorage.getItem('usuario')!))
    this.usuario = this.usuarioSubject.asObservable();

  }
  form: FormGroup = new FormGroup({
    user: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)])
  });

  initializeFormGroup() {
    this.form.setValue({
      user: '',
      password: ''
    });
  }



  login(co_user: string, pass_user: string): Observable<respuesta> {
    console.log(co_user, pass_user)
    return this.http.post<respuesta>(this.url, { co_user, pass_user })
  }


  logout() {
    localStorage.clear();
    this.usuarioSubject.next(null);
  }
}