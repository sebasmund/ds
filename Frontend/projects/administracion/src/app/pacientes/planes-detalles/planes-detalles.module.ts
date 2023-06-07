import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Filter } from '../datos/Filter';
import { PlanesDetallesComponent } from './planes-detalles.component';
import { MaterialModule } from 'projects/tools/src/lib/material/material.module';
import { PlanesDetallesRoutingModule } from './planes-detalles-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { ApplicationPipesModule } from 'projects/tools/src/lib/ApplicationPipesModule';
import { NuevoTratamientoComponent } from './nuevo-tratamiento/nuevo-tratamiento.component';




@NgModule({
  declarations: [
   
    PlanesDetallesComponent,
         NuevoTratamientoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PlanesDetallesRoutingModule, 
    FormsModule, 
    ReactiveFormsModule, 
    ApplicationPipesModule,
    NgxMaskModule.forRoot()
    
   
  ],
  
  providers: [CurrencyPipe, DatePipe]
})
export class PlanesDetallesModule { }
