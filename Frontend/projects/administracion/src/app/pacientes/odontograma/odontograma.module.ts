import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Filter } from '../datos/Filter';
import { OdontogramaComponent } from './odontograma.component';
import { MaterialModule } from 'projects/tools/src/lib/material/material.module';
import { OdontogramaRoutingModule } from './odontograma-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { ApplicationPipesModule } from 'projects/tools/src/lib/ApplicationPipesModule';




@NgModule({
  declarations: [
   
    OdontogramaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    OdontogramaRoutingModule, 
    FormsModule, 
    ReactiveFormsModule, 
    ApplicationPipesModule,
    NgxMaskModule.forRoot()
    
   
  ],
  
  providers: [CurrencyPipe, DatePipe]
})
export class OdontogramaModule { }
