import { Component, OnInit, ViewChild } from '@angular/core';
import * as _moment from 'moment';
import { Moment } from 'moment';
import * as moment from 'moment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DarcitaComponent } from './darcita/darcita.component';
import { AgendaService } from './agenda.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { NotificationService } from 'projects/tools/src/lib/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})

export class AgendaComponent implements OnInit {
  selected: Date | null;
  fecha: Moment;
  fechaString: string;
  fechaDiaria: string;
  semana: number;
  index: number = 0;

  constructor(
    private notification: NotificationService,
    public service: AgendaService,
    private dialog: MatDialog,
    private SpinnerService: NgxSpinnerService
    ) { }

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  columns: Array<any> = [
    { name: 'hora_desde', label: 'Hora', format: 'default' },
    { name: 'paciente', label: 'Paciente', format: 'default' },
    { name: 'nombre_doc', label: 'Doctor', format: 'default' },
    { name: 'co_estatus', label: 'Estatus', format: 'default' }

  ];
  columnsToDisplay = this.columns.map(x => x.name);
  estatus: Array<any> = []
  filterValues: any = {};
  checkedIDs = [];
  selectedItemsList = [];
  checkboxesDataList = [];
  doctores: any[];
  doctorSelected:number=1;
  datoUsuario: any;
  data: any[] = [];
  horas: any[] = [];
  
  ngOnInit(): void {
    this.getfecha();
  }
  
  getUsuarioFromLocalStorage() {
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString) {
      this.datoUsuario = JSON.parse(usuarioString);
    }
  }
  
  getfecha() {
    this.service.getFechaHora().subscribe({
      next: (data) => {
        // Resto del código
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.getEstatus();
        this.citaDiarias();
        this.doctor();
        this.getSemanal();
        this.getUsuarioFromLocalStorage(); // Llamada a la función para obtener el usuario del localStorage
      }
    });
  }
  


  citaDiarias() {

    this.service.citasDiarias(this.fechaDiaria).subscribe({
      next: (data) => {

        this.dataSource = new MatTableDataSource<any>(data)
        this.dataSource.sort = this.sort;

      },
      error: (err) => {

      },
      complete: () => {
        this.dataSource.filterPredicate = ((data: any, filter: string): boolean => {
          const filterValues = JSON.parse(filter);
          let conditions = true;

          for (let filterKey in filterValues) {
            if (filterValues[filterKey].length) {
              conditions = conditions && filterValues[filterKey].includes(data[filterKey]);
            }
          }
          return conditions;
        });
        this.changeSelection();
      }
    });
  }

  getEstatus() {
    this.service.getEstatus().subscribe({
      next: (data) => {
        this.checkboxesDataList = data;


      },
      error: (err) => {

      },
      complete: () => {

      }
    });
  }

  getSemanal() {
    this.SpinnerService.show();
    this.service.getSemanal(this.fechaString,this.doctorSelected).subscribe({
      next: (datos) => {
        
      this.data=datos.data1;
      this.horas=datos.data2;


      },
      error: (err) => {

      },
      complete: () => {
        this.SpinnerService.hide();
      }
    });
  }

  
  doctor() {
    this.service.getDoctores().subscribe({
      next: (data) => {
        this.doctores = data;
        console.log(data);
      },
      error: (err) => {

      },
      complete: () => {

      }
    });
  }

  onDateChange(event: any): void {
    console.log(event);
    //Comienzo de semana
    this.fechaString = moment().isoWeek(moment(event, "MM-DD-YYYY").isoWeek()).startOf('isoWeek').format('YYYY-MM-DD');
    this.fechaDiaria = moment(event).format('YYYY-MM-DD');
    this.citaDiarias();
    this.getSemanal();

  }

  darCita(): void {
    this.service.initializeCita();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "1260px";
    dialogConfig.data = { fecha: this.fechaString }
    const dialogo1 = this.dialog.open(DarcitaComponent, dialogConfig)
    dialogo1.afterClosed().subscribe(art => {
      if (art) {
        this.getEstatus();
        this.citaDiarias();
        this.getSemanal();
      }
    });
  }

  changeSelection() {
    this.filterValues = {};
    const column = 'co_estatus'
    this.filterValues[column] = [0];

    this.checkboxesDataList.forEach((value, index) => {
      if (value.isChecked == 1) {

        if (!this.filterValues.hasOwnProperty(column)) {
          this.filterValues[column] = [value.id];
        } else {
          this.filterValues[column].includes(value.id) ?
            this.filterValues[column] = this.filterValues[column].filter(filterValue => filterValue == value.id) :
            this.filterValues[column].push(value.id);
        }

      }
    });

    this.applyFilter();
  }

  applyFilter() {
    console.log(JSON.stringify(this.filterValues), this.checkboxesDataList);
    this.dataSource.filter = JSON.stringify(this.filterValues);


  }


  select(objeto: any) {
    const ele: any = {
      co_cita: objeto.co_cita,
      co_estatus: objeto.co_estatus,
      user: this.datoUsuario.usuario
    }
    this.service.cambiaEstatus(ele).subscribe({
      next: (data) => {
        data.status ? this.notification.openSnackBar(data.message, '', 'success') : this.notification.openSnackBar(data.message, '', 'error');

      },
      error: (err) => {

      },
      complete: () => {
        this.citaDiarias();
      }
    });

  }

  fetchCheckedIDs() {
    this.checkedIDs = []
    this.checkboxesDataList.forEach((value, index) => {
      if (value.isChecked) {

        this.checkedIDs.push(value.id);
      }
    });
  }

  sel(event: number) {
    this.index = event;
  }

  fetchSelectedItems() {
    this.selectedItemsList = this.checkboxesDataList.filter((value, index) => {
      return value.isChecked
    });
  }

  dia(fecha: string) {
    const dias_semana = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"]
    const mes =["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"]
    moment.locale('es');
    let fecha_mo = dias_semana[moment(fecha, 'YYYY-MM-DD').day()] +' '+moment(fecha,'YYYY-MM-DD').format('D')+' '+ mes[moment(fecha, 'YYYY-MM-DD').month()];
    return fecha_mo;
  }

  onChange(deviceValue: number) {
    this.doctorSelected=deviceValue;
    this.getSemanal();

  }
}
