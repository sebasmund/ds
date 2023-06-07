import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'projects/tools/src/lib/notification.service';
import { PiezasService } from './piezas.service';

@Component({
  selector: 'app-piezas',
  templateUrl: './piezas.component.html',
  styleUrls: ['./piezas.component.css']
})
export class PiezasComponent implements OnInit {
datos:any;
data:any;
selected:string='';
titulo1:string='Pre-Existencias'
titulo2:string='Lesiones'
  constructor(public service: PiezasService,private notification:NotificationService,
        public dialogref: MatDialogRef<PiezasComponent>, @Inject(MAT_DIALOG_DATA) data: any) { 
    this.datos=data;
  }

  ngOnInit(): void {
    this.getPiezas();
  }

getPiezas(){
  //this.SpinnerService.show();
    this.service.getPieza().subscribe({
      next: (data) => {
        this.data = data;
       console.log(this.data);


      },
      error: (err) => {

      },
      complete: () => {

       // this.SpinnerService.hide();
      }
    });
}

  onClose(res: boolean) {
    console.log(res);
    /*this.service.initializeFormGroupVis(); */
    this.dialogref.close(res);
   // this.service.formCita.reset();
  }
  onSubmit(){
    const paciente: number = JSON.parse(localStorage.getItem('paciente'));


    this.service.updateOdon({paciente:this.datos.co_paciente, lesion:this.selected, piezas:this.datos.piezas}).subscribe({
      next: (data) => {
        
        data.status ? this.notification.openSnackBar(data.message, '', 'success') : this.notification.openSnackBar(data.message, '', 'error') ;

      },
      error: (err) => {
       
        this.onClose(false);
       
        this.notification.openSnackBar(err, '', 'error');
      },
      complete: () => {
        
      
        this.onClose(true);
      }
    })

   // console.log(this.service.formCita.value);
    this.onClose(true);
  }

}
