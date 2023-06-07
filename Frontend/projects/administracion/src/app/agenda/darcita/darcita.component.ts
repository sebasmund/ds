import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import moment from 'moment';
import { NotificationService } from '../../../../../tools/src/lib/notification.service';
import { map, Observable, startWith } from 'rxjs';
import { AgendaService } from '../agenda.service';
import { NgxSpinnerService } from 'ngx-spinner';

export interface Doc {
  co_doctor: number;
  nombre_doc: string;
}

@Component({
  selector: 'app-darcita',
  templateUrl: './darcita.component.html',
  styleUrls: ['./darcita.component.css']
})
export class DarcitaComponent implements OnInit {
  check: boolean = false;
  data: any[];
  doctores: any[];
  pacientes: any[];
  tiempos: any[];
  selected: number;
  tiem: number;
  fecha: string;
  semana: number;
  displayDedicacion: any;
  filteredOptions: Observable<Doc[]>;
  datoUsuario: any;

  constructor(
    public service: AgendaService,
    private dialogref: MatDialogRef<DarcitaComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private notification: NotificationService,
    private SpinnerService: NgxSpinnerService
  ) {
    this.fecha = data.fecha;
    this.semana = moment(data.fecha, "YYYY-MM-DD").isoWeek();
  }

  ngOnInit(): void {
    this.getUsuarioFromLocalStorage();
    this.doctor();
    this.paciente();
  }

  getUsuarioFromLocalStorage() {
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString && usuarioString !== 'undefined') {
      this.datoUsuario = JSON.parse(usuarioString);
    } else {
      this.datoUsuario = null; // Asignar un valor predeterminado cuando no se encuentra el usuario en el localStorage
    }
  }


  displayFn(user: Doc): string {
    //console.log(user)
    return user && user.nombre_doc ? user.nombre_doc : '';
  }

  private _filter(name: Doc): Doc[] {

    // console.log(name);
    return this.doctores.filter(option =>
      option.nombre_doc.toLowerCase().indexOf(option.nombre_doc.toLowerCase()) === 0);
  }

  darCita(fecha: string, doctor: number): void {
    this.SpinnerService.show();
    this.service.getTablaCitas(fecha, doctor).subscribe({
      next: (data) => {
        this.data = data;
        console.log(data);
        // this.dataSource = new MatTableDataSource<paciente>(data)
        //this.dataSource.sort = this.sort;


      },
      error: (err) => {

      },
      complete: () => {
        this.SpinnerService.hide();
        // this.SpinnerService.hide();
      }
    });
  }

  doctor() {
    console.log("Funcion Doctor")
    this.service.getDoctores().subscribe({
      next: (data) => {
        this.doctores = data;
        console.log(data);
        // this.dataSource = new MatTableDataSource<paciente>(data)
        //this.dataSource.sort = this.sort;


      },
      error: (err) => {

      },
      complete: () => {

      }
    });
  }



  paciente() {
    this.service.getPacientes().subscribe({
      next: (data) => {
        this.pacientes = data;
        console.log(data);
        // this.dataSource = new MatTableDataSource<paciente>(data)
        //this.dataSource.sort = this.sort;


      },
      error: (err) => {

      },
      complete: () => {

      }
    });
  }

  tiempo(co_doctor: number) {
    this.service.getTiempo(co_doctor).subscribe({
      next: (data) => {
        this.tiempos = data;
        console.log(data);
        // this.dataSource = new MatTableDataSource<paciente>(data)
        //this.dataSource.sort = this.sort;


      },
      error: (err) => {

      },
      complete: () => {
        // this.SpinnerService.hide();
      }
    });
  }

  onChange(deviceValue: number) {
     console.log("calendario")
    this.darCita(this.fecha, deviceValue);
    this.tiempo(deviceValue);

  }
  onSelectionChange(event: any) {
    //console.log(event)
  }

  anterior() {
    //Anterior semana
    this.semana -= 1;
    this.fecha = moment().isoWeek(this.semana).startOf('isoWeek').format('YYYY-MM-DD');
    this.darCita(this.fecha, this.service.formCita.get('doctor').value);
    this.service.formCita.controls['cita'].setValue('')
    console.log(this.semana, this.fecha);
  }
  siguiente() {
    //Proxima semana
    this.semana += 1;
    this.fecha = moment().isoWeek(this.semana).startOf('isoWeek').format('YYYY-MM-DD');
    this.darCita(this.fecha, this.service.formCita.get('doctor').value);
    this.service.formCita.controls['cita'].setValue('')
    console.log(this.semana, this.fecha);
  }
  getTitle(bookId: any) {
    console.log(bookId);
    if (typeof bookId != "number")
      return ''
    else {
      let index = this.pacientes.findIndex(state => state.co_paciente === bookId);
      return this.pacientes[index].paciente;

    }

  }

  checkValue(event: any, indice: number) {
    //console.log('Indice', indice);
    let desmarcados: boolean = true;
    let fec_select: string;
    let hora: string;
    this.data.forEach((element, index) => {
      element.horas.forEach((element1, index1) => {
        // console.log('Indice', element1.verificado);
        if (element1.verificado && element1 != indice) {
          //  console.log(element1);
          element1.verificado = false;

        }
        if (element1.verificado) {
          desmarcados = false;
          fec_select = element.Fecha;
          hora = element1.hora;
        }

      });
    });
    console.log(fec_select, hora);

    desmarcados ? this.service.formCita.controls['cita'].setValue('') : this.service.formCita.controls['cita'].setValue(hora);
    this.service.formCita.controls['fecha'].setValue(fec_select);
    // this.service.formCita.updateValueAndValidity();
    // this.service.formCita.clearValidators()
    console.log(this.service.formCita.controls['cita'].valid)

  }

  onSubmit(): void {

    let duracion = this.tiempos[this.tiempos.findIndex(state => state.orden === this.service.formCita.get('tiempo').value)].intervalo;
    let final = moment(this.service.formCita.get('cita').value, 'HH:mm').add(duracion, 'm').format('HH:mm');
    this.service.formCita.controls['final'].setValue(final)
    this.service.formCita.controls['usuario'].setValue(this.datoUsuario.usuario);
    this.service.formCita.controls['email'].setValue(this.service.formCita.get('email').value ? 1 : 0)
    this.service.updateCita(this.service.formCita.value).subscribe({
      next: (data) => {

        data.status ? this.notification.openSnackBar(data.message, '', 'success') : this.notification.openSnackBar(data.message, '', 'error');

      },
      error: (err) => {

        this.onClose(false);

        this.notification.openSnackBar(err, '', 'error');
      },
      complete: () => {


        this.onClose(true);
      }
    })

    console.log(this.service.formCita.value);
    this.onClose(true);
  }

  dia(fecha: string) {
    const dias_semana = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"]
    const mes = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
    moment.locale('es');
    //let fecha_mo= moment(fecha).format('D MMM')+moment.weekdays[moment().day()].toString();
    let fecha_mo = dias_semana[moment(fecha, 'YYYY-MM-DD').day()] + ' ' + moment(fecha, 'YYYY-MM-DD').format('D') + ' ' + mes[moment(fecha, 'YYYY-MM-DD').month()];
    return fecha_mo;
  }

  onClose(res: boolean) {

    /*this.service.initializeFormGroupVis(); */
    this.dialogref.close(res);
    this.service.formCita.reset();
  }
}


