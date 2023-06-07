import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../paciente.service';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { Moment } from 'moment';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { paciente } from './paciente';
import { NotificationService } from '../../../../../tools/src/lib/notification.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css'],
  providers: [

    { provide: MAT_DATE_LOCALE, useValue: 'es-VE' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class DatosComponent implements OnInit {
  convenio: any = [
    { cod: 1, desc: 'Sin Convenio' },
    { cod: 2, desc: 'Coca-Cola' },
    { cod: 3, desc: 'Familia' }
  ];

  sexos: any = [
    { cod: 'F', desc: 'Femenino' },
    { cod: 'M', desc: 'Masculino' }
  ];

  ciudad: any[];
  estado: any[];
  minDate: Moment;
  maxDate: Moment;
  selected :number;
  datoUsuario = JSON.parse(localStorage.getItem('usuario'));
  constructor(
    public service: PacienteService,
    public router: Router,
    private route: ActivatedRoute,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.selected = this.service.formPaciente.get('co_edo').value | 0;
    this.service.formPaciente.get('co_paciente').disable();
    this.service.formPaciente.get('co_user_in').disable();
    this.service.formPaciente.get('fecha_insert').disable();
    this.service.formPaciente.get('co_user_mo').disable();
    this.service.formPaciente.get('fecha_modif').disable();
    this.llenarListas();
    this.suscribeCambioDeRuta();
  }


  suscribeCambioDeRuta(): void {
    this.route.params.subscribe(params => {
     // console.log(params['id']);
     // this.paciente=params['id'];
      
     // console.log(this.route.snapshot.parent);
      //this.cargarBoca();
          // Obtengo los datos del edificio
      
   });
  }

  llenarListas(): void {
    this.ciudades();
    this.estados();

  }

  ciudades(): void {
    this.service.getCiudades()
      .subscribe({
        next: (data) => {
          this.ciudad = data;

          console.log(data);
        },
        error: (err) => {
          console.log(err);
        }
      });

  }
  estados(): void {
    this.service.getEstados()
      .subscribe({
        next: (data) => {
          this.estado = data;

          console.log(data);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }
  onSubmit() {
    console.log('Voy');
    this.service.formPaciente.get('co_user_in').enable();
    this.service.formPaciente.get('fecha_insert').enable();
    this.service.formPaciente.get('co_user_mo').enable();
    this.service.formPaciente.get('fecha_modif').enable();
    this.service.formPaciente.get('co_paciente').enable();

    

    if (this.service.formPaciente.get('co_paciente').value == null) {
      this.service.formPaciente.controls['co_user_in'].setValue(this.datoUsuario.usuario);
     

        //this.SpinnerService.show();
        this.service.insertPaciente(this.service.formPaciente.value).subscribe({
          next: (data) => {
           if(data.status){
              this.notification.openSnackBar(data.message, '', 'success');
             // this.onClose(true);
           }
          
          
          },
          error: (err) => {
            this.notification.openSnackBar(err.message, '', 'error');
          },
          complete: () => {
           // this.readPaciente();
            
           // this.SpinnerService.hide();
          }
        });
      

    } else {
      this.service.formPaciente.controls['co_user_mo'].setValue(this.datoUsuario.usuario);
      this.service.updatePaciente(this.service.formPaciente.value).subscribe({
        next: (data) => {
         if(data.status){
          this.notification.openSnackBar(data.message, '', 'success');
          //this.onClose(true);
       }else{
          this.notification.openSnackBar(data.message , '', 'error');
       }
       
        
        },
        error: (err) => {
          this.notification.openSnackBar(err , '', 'error');
          console.log(err);
        },
        complete: () => {
         // this.readPaciente();
          
         // this.SpinnerService.hide();
        }
      });
    }
  }

  
  //this.CargarListas();








}
