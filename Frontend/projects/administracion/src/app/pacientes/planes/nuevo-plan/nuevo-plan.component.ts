import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgendaService } from '../../../agenda/agenda.service';
import { PacienteService } from '../../paciente.service';

@Component({
  selector: 'app-nuevo-plan',
  templateUrl: './nuevo-plan.component.html',
  styleUrls: ['./nuevo-plan.component.css']
})
export class NuevoPlanComponent implements OnInit {
  doctores: any[];
  paciente: number;
  constructor(
    public service: PacienteService,
    private serviceAgenda: AgendaService,
    private dialogref: MatDialogRef<NuevoPlanComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
  ) {

    this.paciente = data.co_paciente;
  }

  ngOnInit(): void {
    this.doctor();
    this.service.formTrata.controls['co_paciente'].setValue(this.paciente);
  }

  doctor() {
    this.serviceAgenda.getDoctores().subscribe({
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
  onSubmit() {
    console.log(this.service.formTrata.value);

    this.service.insertTrata(this.service.formTrata.value).subscribe({
      next: (data) => {
        //this.doctores = data;
        console.log(data);
        // this.dataSource = new MatTableDataSource<paciente>(data)
        //this.dataSource.sort = this.sort;


      },
      error: (err) => {

      },
      complete: () => {

      }
    });
    this.onClose(true);

  }
  onClose(retorna: boolean) {
    this.service.formTrata.reset();
    /*this.service.initializeFormGroupVis(); */
    this.dialogref.close(retorna);
  }
}
