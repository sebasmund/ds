import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'projects/tools/src/lib/notification.service';
import { PiezasComponent } from '../../piezas/piezas.component';

import { PacienteService } from '../paciente.service';

@Component({
  selector: 'app-odontograma',
  templateUrl: './odontograma.component.html',
  styleUrls: ['./odontograma.component.css']
})
export class OdontogramaComponent implements OnInit {
  paciente: number ;
  data: any;
  dataSource: MatTableDataSource<any[]>;
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  columns: Array<any> = [
    
    { name: 'fecha', label: 'Fecha.', format: 'date' },
    { name: 'Descripcion', label: 'Desripcion', format: 'default' },
    { name: 'pieza', label: 'Pieza', format: 'default' },
   

  ];
  columnsToDisplay = this.columns.map(x => x.name);
  constructor(private route: ActivatedRoute, private router: Router, private service: PacienteService,
    private SpinnerService: NgxSpinnerService,private notification:NotificationService,
    private dialog: MatDialog) { 
    
     
    }
  selectedSup: string = '';
  selectedInf: string = '';




  ngOnInit(): void {

    //this.cargarBoca();
    this.suscribeCambioDeRuta();
  }


  suscribeCambioDeRuta(): void {
    this.route.params.subscribe(params => {
     // console.log(params['id']);
      this.paciente=params['id'];
      
     // console.log(this.route.snapshot.parent);
      this.cargarBoca();
          // Obtengo los datos del edificio
      
   });
  }
  cargarBoca() {
    this.SpinnerService.show();
    this.service.getBoca(this.paciente).subscribe({
      next: (data) => {
        this.data = data;
        this.dataSource = new MatTableDataSource<any[]>(this.data.tabla)
        //this.dataSource.sort = this.sort;
      //console.log('Tabla',this.data.tabla);


      },
      error: (err) => {

      },
      complete: () => {

        this.SpinnerService.hide();
      }
    });
  }
  reset() {
    this.selectedSup = '';
    this.selectedInf = '';
  }
  aplicar() {

    let arra = this.selectedSup.toString() != '' && this.selectedInf.toString() != '' ? this.selectedSup.toString() + ',' + this.selectedInf.toString() : this.selectedInf.toString() != '' ? this.selectedInf.toString() : this.selectedSup.toString();
    console.log({piezas:arra.split(',')});

   // this.propietarioService.populateFormProp(row);
    //console.log(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    //dialogConfig.width = "570px";
   // dialogConfig.height = "540px";
   // dialogConfig.maxHeight="700px";
    
    dialogConfig.data = {co_paciente: this.paciente,piezas:arra.split(',')};
    const dialogo1 = this.dialog.open(PiezasComponent, dialogConfig)
    dialogo1.afterClosed().subscribe(art => {
      if (art) {
        
        this.selectedInf='';
        this.selectedSup='';
        this.cargarBoca();
      }

    });


  }

delete(elemento:any){
  console.log(elemento);
  this.service.deleteDetalle(elemento).subscribe({
    next: (data) => {

      data.status ? this.notification.openSnackBar(data.message, '', 'success') : this.notification.openSnackBar(data.message, '', 'error') ;

      this.cargarBoca();

    },
    error: (err) => {

    },
    complete: () => {
     
      
    }
  });
 
}
 
}
