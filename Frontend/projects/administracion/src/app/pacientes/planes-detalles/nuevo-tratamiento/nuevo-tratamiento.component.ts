import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'projects/tools/src/lib/notification.service';
import { PacienteService } from '../../paciente.service';

@Component({
  selector: 'app-nuevo-tratamiento',
  templateUrl: './nuevo-tratamiento.component.html',
  styleUrls: ['./nuevo-tratamiento.component.css']
})
export class NuevoTratamientoComponent implements OnInit {
  prestaciones: any[];
  trata: number;
  piezas: any[];
  constructor(
    public service: PacienteService,
    private dialogref: MatDialogRef<NuevoTratamientoComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private notification: NotificationService,
  ) {
    this.trata = data.trata;
    this.piezas = data.piezas;
  }

  ngOnInit(): void {
    this.service.formDetalleTrata.controls['co_tratamiento'].setValue(this.trata);
    this.prestacion();
  }

  prestacion() {
    this.service.getPrestacion().subscribe({
      next: (data) => {
        this.prestaciones = data;
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
  onSubmit() {
    console.log(this.service.formDetalleTrata.value,{ co_tratamiento: this.trata, co_prestacion: this.service.formDetalleTrata.get('co_prestacion').value, piezas: this.piezas });

    this.service.insertDetalleTrata({ co_tratamiento: this.trata, co_prestacion: this.service.formDetalleTrata.get('co_prestacion').value, piezas: this.piezas }).subscribe({
      next: (data) => {
        //this.doctores = data;
       data.status ? this.notification.openSnackBar(data.message, '', 'success') : this.notification.openSnackBar(data.message, '', 'error');
        console.log(data);
        // this.dataSource = new MatTableDataSource<paciente>(data)
        //this.dataSource.sort = this.sort;


      },
      error: (err) => {

      },
      complete: () => {
        this.onClose(true);
      }
    });


  }
  onClose(retorna: boolean) {
    this.service.formDetalleTrata.reset();
    /*this.service.initializeFormGroupVis(); */
    this.dialogref.close(retorna);

  }
}
