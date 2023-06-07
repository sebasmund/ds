import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../../tools/src/lib/material/material.module';

import { DatosComponent } from './datos.component';
import { DatosRoutingModule } from './datos-routing.module';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Filter } from './Filter';


@NgModule({
  declarations: [
   
    DatosComponent,
    Filter
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DatosRoutingModule, 
    FormsModule, 
    ReactiveFormsModule, 
    
    NgxMaskModule.forRoot()
   
  ]
})
export class Datos2Module { }
