import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'projects/tools/src/lib/notification.service';
import { Filter } from '../../pacientes/datos/Filter';
import { AgendaService } from '../agenda.service';

@Component({
  selector: 'app-diaria',
  templateUrl: './diaria.component.html',
  styleUrls: ['./diaria.component.css']
})
export class DiariaComponent implements OnInit {
  fecha: string;
  private parametersObservable: any;
  datoUsuario = JSON.parse(localStorage.getItem('usuario'));
  constructor(private notification: NotificationService,
    public service: AgendaService,
    private route1: ActivatedRoute,
    private router: Router
  ) { }
  

  estatus: Array<any> = [
    { id: 1, descrip: 'No confirmado' },
    { id: 2, descrip: 'Confirmado por telefono' }
  ]
  



  filterValues: any = {};
  checkboxesDataList = [
    {
      id: 1,
      label: 'No confirmado',
      isChecked: true
    },
    {
      id: 2,
      label: 'Confirmado por telefono',
      isChecked: true
    },
    {
      id: 3,
      label: 'En sala de espera',
      isChecked: true
    },
    {
      id: 4,
      label: 'Atendiéndose',
      isChecked: true
    },
    {
      id: 5,
      label: 'Atendido',
      isChecked: true
    },
    {
      id: 6,
      label: 'No asiste',
      isChecked: true
    },
    {
      id: 7,
      label: 'Confirmar por WhatsApp',
      isChecked: true
    },
    {
      id: 8,
      label: 'Cancelada',
      isChecked: false
    }
  ]

 

  ngOnInit(): void {
   // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  //  this.parametersObservable = this.route1.params.subscribe(params => {
  
      this.fecha = this.route1.snapshot.params['fecha'];
   
     



 //   });
    //
    // console.log(this.fecha);

  }

 


 




}
