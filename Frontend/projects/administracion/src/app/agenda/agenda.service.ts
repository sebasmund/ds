import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Response } from '../../../../tools/src/lib/response';
export class fecha {
  fecha: string;
  hora: string;
  
}

export class data{
  data1:any=[];
  data2:any=[];
}

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  //url = environment.API_URL;
  url= '/dentistas'

  constructor(private http: HttpClient) { }


  formCita: FormGroup = new FormGroup({
    doctor: new FormControl('', [Validators.required]),
    tiempo: new FormControl('', [Validators.required]),
    paciente: new FormControl('', [Validators.required]),
    fecha: new FormControl('', [Validators.required]),
    cita: new FormControl('', [Validators.required]),
    email:new FormControl(''),
    final:new FormControl(''),
    usuario:new FormControl('')
   

  }, {
 
  });

  formVista: FormGroup = new FormGroup({
    co_estatus: new FormControl('', [Validators.required])
  });

  initializeCita() {
    this.formCita.setValue({
      doctor: '',
      tiempo: '',
      paciente: '',
      fecha: '',
      cita: '',
      final:'',
      email:'',
      usuario:''
    });


  }
  getTablaCitas(fecha:string,doctor:number): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/darcita/'+fecha+'/'+doctor);
  }

  getSemanal(fecha:string,doctor:number): Observable<data> {
    return this.http.get<data>(this.url + '/semanal/'+fecha+'/'+doctor);
  }
  getDoctores(): Observable<any[]> {
    console.log(this.url+'/dentistas')
    return this.http.get<any[]>(this.url);
  }

  getTiempo(co_doctor:number): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/tiempo/'+co_doctor);
  }
  getPacientes(): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/pacientes');
  }

  getEstatus(): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/estatus');
  }
  getFechaHora(): Observable<fecha> {
    return this.http.get<fecha>(this.url + '/fecha');
  }

  updateCita(data:any): Observable<Response> {
    return this.http.post<Response>(this.url + '/updatecita', data);
  }

  citasDiarias(fecha:string): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/citasdiarias/'+fecha);
  }

  cambiaEstatus(data:any): Observable<Response> {
    console.log(data);
    return this.http.put<Response>(this.url + '/cambiaestatus/'+data.co_cita,data);
  }
}
