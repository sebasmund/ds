import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PacienteService } from '../paciente.service';
import { NuevoPlanComponent } from './nuevo-plan/nuevo-plan.component';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {
  paciente: number;
  data: any = [];
  noData: boolean = false;
  selectedInf: string;
  selectedSup: string;
  constructor(
    private SpinnerService: NgxSpinnerService,
    private route: ActivatedRoute,
    private service: PacienteService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.suscribeCambioDeRuta();
  }
  suscribeCambioDeRuta(): void {
    this.route.params.subscribe(params => {
      // console.log(params['id']);
      this.paciente = params['id'];

      // console.log(this.route.snapshot.parent);
      this.cargar();
      // Obtengo los datos del edificio

    });
  }
  cargar() {
    this.SpinnerService.show();
    this.service.getTratamientos(this.paciente).subscribe({
      next: (data) => {


        if (data.status) {
          this.noData = false;
          this.data = data.data;
          console.log(this.data);
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



  nuevo() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    //dialogConfig.width = "570px";
   // dialogConfig.height = "540px";
   // dialogConfig.maxHeight="700px";
    
    dialogConfig.data = {co_paciente: this.paciente};
    const dialogo1 = this.dialog.open(NuevoPlanComponent, dialogConfig)
    dialogo1.afterClosed().subscribe(art => {
      if (art) {
        this.suscribeCambioDeRuta();
        this.selectedInf='';
        this.selectedSup='';
      }

    });
  }
  ver(trata:number) {
    console.log('Click');
    this.router.navigate(['paciente/planes', this.paciente, 'detalles',trata]);
  }
}
