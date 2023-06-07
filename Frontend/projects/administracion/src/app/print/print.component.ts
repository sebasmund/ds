import { Component,  OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PrintService } from './print.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {
i:number;
  comment: string = '<div class="alert alert-success alert-dismissible fade show" *ngIf="isRateLimitReached">\
  <strong>¡Imprimir!</strong> Seleccione una de las opciones arriba.\
  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>\
</div>';

 

  constructor(
    private service: PrintService,
    public sanitizer: DomSanitizer,
    private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
   this.printResumido();
   
  }

  
  printResumido(): void {

    this.SpinnerService.show();
    this.service.getResumido().subscribe({
      next: (data) => {
        this.comment = data;

      },
      error: (err) => {
        console.log(err);
        
      },
      complete: () => {
        this.SpinnerService.hide();
        
      }
    });
  }
  printDetalle(): void {


    this.SpinnerService.show();
    this.service.getDetalle().subscribe({
      next: (data) => {
        this.comment = data;
        



      },
      error: (err) => {
        console.log(err);
        
      },
      complete: () => {
        this.SpinnerService.hide();
     
      }
    });
  }
}
