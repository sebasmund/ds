import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Response } from '../../../../tools/src/lib/response';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { paciente } from './datos/paciente';
import { pacientes } from './datos copy/paciente';

@Injectable({
  providedIn: 'root'
})

export class PacienteService {
  url = environment.API_URL;

  constructor(private http: HttpClient) { }


  formPaciente: FormGroup = new FormGroup({
    co_paciente: new FormControl({ value: '', disabled: true }),
    nombre_pac: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    apellidos_pac: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    ced_pac: new FormControl('', [Validators.required]),
    email_pac: new FormControl('', [Validators.required, Validators.email]),
    convenio_pac: new FormControl(''),
    sexo: new FormControl(''),
    fecha_nac_pac: new FormControl('', [Validators.required]),
    ciudad_pac: new FormControl('', [Validators.required]),
    co_edo: new FormControl(''),
    direccion_pac: new FormControl('', [Validators.required]),
    telef_fijo: new FormControl('', [Validators.required, Validators.minLength(10)]),
    telef_movil: new FormControl('', [Validators.required, Validators.minLength(10)]),

    co_user_in: new FormControl({ value: '', disabled: true }),
    fecha_insert: new FormControl({ value: '', disabled: true }),
    co_user_mo: new FormControl({ value: '', disabled: true }),
    fecha_modif: new FormControl({ value: '', disabled: true })

  }, {
    //validators: [horaMatcher1 ,horaMatcher2],

  });

  populateFormProp(row: paciente) {
    //console.log('Service', row.co_paciente);
    this.formPaciente.setValue({
      co_paciente: row.co_paciente,
      nombre_pac: row.nombre_pac,
      apellidos_pac: row.apellidos_pac,
      ced_pac: row.ced_pac,
      email_pac: row.email_pac,
      convenio_pac: row.convenio_pac,
      sexo: row.sexo,
      fecha_nac_pac: row.fecha_nac_pac,
      ciudad_pac: row.ciudad_pac,
      co_edo: row.co_edo,
      direccion_pac: row.direccion_pac,
      telef_fijo: row.telef_fijo,
      telef_movil: row.telef_movil,
      co_user_in: row.co_user_in,
      fecha_insert: row.fecha_insert,
      co_user_mo: row.co_user_mo,
      fecha_modif: row.fecha_modif

    });
  }

  iniciaForm() {

    this.formPaciente.setValue({
      co_paciente: null,
      nombre_pac: null,
      apellidos_pac: null,
      ced_pac: null,
      email_pac: null,
      convenio_pac: null,
      sexo: null,
      fecha_nac_pac: null,
      ciudad_pac: null,
      co_edo: null,
      direccion_pac: null,
      telef_fijo: null,
      telef_movil: null,
      co_user_in: null,
      fecha_insert: null,
      co_user_mo: null,
      fecha_modif: null
    });
  }

  formTrata: FormGroup = new FormGroup({
    co_paciente: new FormControl(''),
    co_tratamiento: new FormControl('', [Validators.required]),
    co_doctor:new FormControl('', [Validators.required]),
  });

  formDetalleTrata: FormGroup = new FormGroup({
    co_tratamiento: new FormControl(''),
    co_prestacion: new FormControl('', [Validators.required]),
    
  });


  getPacientes(): Observable<pacientes[]> {
    return this.http.get<pacientes[]>(this.url + '/pacientes');
  }




  getPaciente(id: number): Observable<paciente> {
    return this.http.get<paciente>(this.url + '/paciente/' + id);
  }

  getPrestacion(): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/prestaciones');
  }
  getCiudades(): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/ciudad');
  }
  getEstados(): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/estado');
  }

  insertPaciente(data: paciente): Observable<Response> {
    return this.http.post<Response>(this.url + '/paciente', data);
  }
  updatePaciente(data: paciente): Observable<Response> {
    return this.http.put<Response>(this.url + '/paciente/' + data.co_paciente, data);
  }
  getBoca(co_paciente: number): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/boca/' + co_paciente);
  }
  deleteDetalle(id: number): Observable<Response> {
    return this.http.delete<Response>(this.url + '/deletedetalle/' + id);
  }

  getTratamientos(id: number): Observable<Response> {
    return this.http.get<Response>(this.url + '/tratamientos/' + id);
  }

  getBocaTrata(contrato: number, paciente: number): Observable<Response> {
    return this.http.get<Response>(this.url + '/bocatrata/' + contrato + '/' + paciente);
  }
  updateRealizado(codigo: number): Observable<Response> {
    return this.http.put<Response>(this.url + '/realizado', { codigo: codigo });
  }
  deleteTratamiento(id: number): Observable<Response> {
    return this.http.delete<Response>(this.url + '/deleterealizado/' + id);
  }
  insertTrata(data: any): Observable<Response> {
    return this.http.post<Response>(this.url + '/inserttrata', data);
  }

  insertDetalleTrata(data: any): Observable<Response> {
    return this.http.post<Response>(this.url + '/insertdetalletrata', data);
  }
}