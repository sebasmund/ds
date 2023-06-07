import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AgendaService } from '../agenda.service';

@Component({
  selector: 'app-semanal',
  templateUrl: './semanal.component.html',
  styleUrls: ['./semanal.component.css']
})
export class SemanalComponent implements OnInit {
  private parametersObservable: any;
  fecha: string;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort = new MatSort;
  constructor( private service: AgendaService, private route1: ActivatedRoute) { }

  ngOnInit(): void {
    this.parametersObservable = this.route1.params.subscribe(params => {
      
      this.fecha = this.route1.snapshot.params['fecha'];
      this.citaSemanal();
      
     
    });
  }
  ngOnDestroy() {
    if(this.parametersObservable != null) {
      this.parametersObservable.unsubscribe();
    }
  }
  citaSemanal(){
    this.service.citasDiarias(this.fecha).subscribe({
      next: (data) => {
       console.log(data);
       this.dataSource = new MatTableDataSource<any>(data)
       this.dataSource.sort = this.sort;

      },
      error: (err) => {
      
      },
      complete: () => {
  
      }
    });
   }
}
