import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../paciente.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { NotificationService } from 'projects/tools/src/lib/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NuevoTratamientoComponent } from './nuevo-tratamiento/nuevo-tratamiento.component';
@Component({
  selector: 'app-planes-detalles',
  templateUrl: './planes-detalles.component.html',
  styleUrls: ['./planes-detalles.component.css']
})
export class PlanesDetallesComponent implements OnInit {
  selectedSup: string = '';
  selectedInf: string = '';
  paciente: number;
  trata: number;
  noData: boolean;
  data: any;
  deuda: number;
  dataSource: MatTableDataSource<any[]>;
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  columns: Array<any> = [

    { name: 'realizado', label: 'Listo!', format: 'default' },
    { name: 'nombre', label: 'Prestación', format: 'default' },
    { name: 'pieza', label: 'Pieza', format: 'default' },
    { name: 'fecha_realizacion', label: 'Realización', format: 'default' },
    { name: 'monto', label: 'Monto', format: 'currency' },

  ];
  columnsToDisplay = this.columns.map(x => x.name);
  constructor(
    private _location: Location,
    private SpinnerService: NgxSpinnerService,
    private route: ActivatedRoute,
    private service: PacienteService,
    private router: Router,
    private notification:NotificationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.suscribeCambioDeRuta()
  }

  suscribeCambioDeRuta(): void {
    this.route.params.subscribe(params => {

      this.paciente = params['id'];
      this.trata = params['id2'];
      console.log(this.paciente, this.trata);
      // console.log(this.route.snapshot.parent);
      this.cargar(this.trata, this.paciente);
      // Obtengo los datos del edificio

    });
  }
  cargar(contrato: number, paciente: number) {
    this.SpinnerService.show();
    this.service.getBocaTrata(contrato, paciente).subscribe({
      next: (data) => {


        if (data.status) {
          this.noData = false;
          this.data = data.data;
          this.deuda = this.data.deuda.deuda;
          this.dataSource = new MatTableDataSource<any[]>(this.data.tabla)
        } else {
          this.noData = true;
        }
        //this.dataSource = new MatTableDataSource<any[]>(this.data.tabla)
        //this.dataSource.sort = this.sort;
        console.log('Tabla', this.data);


      },
      error: (err) => {
        console.log(err);
        this.SpinnerService.hide();
      },
      complete: () => {

        this.SpinnerService.hide();
      }
    });
  }
  onPrev(): void {
    this._location.back();
  }
  delete(id: number) {
    this.service.deleteTratamiento(id).subscribe({
      next: (data) => {


        if (data.status) {
          this.notification.openSnackBar(data.message, '', 'success')
          this.cargar(this.trata,this.paciente);
        } else {
          this.notification.openSnackBar(data.message, '', 'error')
        }
        //this.dataSource = new MatTableDataSource<any[]>(this.data.tabla)
        //this.dataSource.sort = this.sort;



      },
      error: (err) => {
        console.log(err);
     
      },
      complete: () => {

       
      }
    });
  }
  checkValue(value: any, codigo: number) {

    this.service.updateRealizado(codigo).subscribe({
      next: (data) => {


        if (data.status) {
          this.notification.openSnackBar(data.message, '', 'success')
          this.cargar(this.trata,this.paciente);
        } else {
          this.notification.openSnackBar(data.message, '', 'error')
        }
        //this.dataSource = new MatTableDataSource<any[]>(this.data.tabla)
        //this.dataSource.sort = this.sort;



      },
      error: (err) => {
        console.log(err);
     
      },
      complete: () => {

       
      }
    });
  }
  aplicar(){

    let arra = this.selectedSup.toString() != '' && this.selectedInf.toString() != '' ? this.selectedSup.toString() + ',' + this.selectedInf.toString() : this.selectedInf.toString() != '' ? this.selectedInf.toString() : this.selectedSup.toString();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    
    dialogConfig.data = {trata: this.trata,piezas:arra.split(',')};
    const dialogo1 = this.dialog.open(NuevoTratamientoComponent, dialogConfig)
    dialogo1.afterClosed().subscribe(art => {
      if (art) {
        this.suscribeCambioDeRuta();
        this.selectedInf='';
        this.selectedSup='';
      }

    });
  }
}
