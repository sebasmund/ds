import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Filter } from '../datos/Filter';
import { ImagenesComponent } from './imagenes.component';
import { MaterialModule } from 'projects/tools/src/lib/material/material.module';
import { ImagenesRoutingModule } from './imagenes-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [
   
    ImagenesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ImagenesRoutingModule, 
    FormsModule, 
    ReactiveFormsModule, 
    
    NgxMaskModule.forRoot()
   
  ]
})
export class ImagenesModule { }
