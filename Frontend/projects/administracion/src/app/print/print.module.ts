import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintRoutingModule } from './print-routing.modules';
import { MaterialModule } from '../../../../tools/src/lib/material/material.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrintRoutingModule,
    MaterialModule,
  ]
})
export class PrintModule { }
