import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PacienteService } from './paciente.service';
import { Chart, DashBoard, Series } from './Dashboard';
import { interval, map, Observable, startWith, Subscription } from 'rxjs';

import { DeviceDetectorService } from 'ngx-device-detector';
import { TooltipDirective } from '@swimlane/ngx-charts';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from '../../../../tools/src/lib/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { paciente } from './datos/paciente';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DatosComponent } from './datos/datos.component';
import { FormControl } from '@angular/forms';
import { pacientes } from './datos copy/paciente';




@Component({
  selector: 'app-home',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements AfterViewInit, OnInit, OnDestroy {

  now: Date;
  nowString: string;
  series: Series[];
  todo: pacientes[];
  paciente: paciente;
  currentItem:number;
  myControl = new FormControl('');
  options: pacientes[] = [];
  filteredOptions: Observable<pacientes[]>;
  
  cliente: number;
  constructor(private service: PacienteService,
    private SpinnerService: NgxSpinnerService,
    private notification: NotificationService,
    public router: Router,
    private route:ActivatedRoute,
    private dialog: MatDialog) {
  
 
  }



  ngAfterViewInit(): void {

    //this.carga();


  }
  ngOnInit() {


    this.readPaciente();

  }

  displayFn(user: pacientes): string {

    return user && user.name ? user.name : '';
  }

  private _filter(name: string): pacientes[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }



  readPaciente(): void {

    this.SpinnerService.show();
    this.service.getPacientes().subscribe({
      next: (data) => {
        this.options = [];
        this.todo = data;
        console.log(this.todo);
        Object.keys(data).forEach(async (to, i) => {
          this.options.push({ id: data[to].co_paciente, name: data[to].paciente })
        });
        console.log(this.options);

      },
      error: (err) => {

      },
      complete: () => {
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.name;
            return name ? this._filter(name as string) : this.options.slice();
          }),
        );
        this.SpinnerService.hide();
      }
    });
  }


  buscar(x: any) {
    //console.log(x.value, this.myControl);
    this.cliente = x.value.id;
    //localStorage.setItem('paciente', JSON.stringify(this.cliente));
  if(this.router.url.indexOf('odontograma')!=-1){
    this.router.navigate(['paciente/odontograma', this.cliente]);
  }
  if(this.router.url.indexOf('planes')!=-1){
    this.router.navigate(['paciente/planes', this.cliente]);
  }
  if(this.router.url.indexOf('imagenes')!=-1){
    this.router.navigate(['paciente/imagenes', this.cliente]);
  }
  if(this.router.url.indexOf('datos2')!=-1){
    this.router.navigate(['paciente/datos2', this.cliente]);
  }
  
    
    this.service.getPaciente(this.cliente).subscribe({
      next: (data) => {

        this.paciente = data[0];

        console.log(data[0]);

      },
      error: (err) => {

      },
      complete: () => {
        this.service.populateFormProp(this.paciente);
        this.SpinnerService.hide();
      }
    });
  }




  edit(row?: paciente) {
    if (row == undefined) {
      this.service.iniciaForm();

    } else {
      this.service.populateFormProp(row);
    }

    //console.log(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "350px";

    const dialogo1 = this.dialog.open(DatosComponent, dialogConfig)
    dialogo1.afterClosed().subscribe(art => {
      if (art) {
        this.readPaciente();
      }
    });


  }



  incluir(): void {
    this.service.iniciaForm();

  }

  ngOnDestroy() {
    localStorage.removeItem('paciente');
  }
}