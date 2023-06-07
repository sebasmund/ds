import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MaterialModule } from '../../../../../tools/src/lib/material/material.module';
import { DiariaRoutingModule } from './diaria-routing.module';
import { DiariaComponent } from './diaria.component';
import { ApplicationPipesModule } from 'projects/tools/src/lib/ApplicationPipesModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [DiariaComponent],
  
  imports: [
    CommonModule,
    MaterialModule,
    DiariaRoutingModule , 
    FormsModule, 
    ReactiveFormsModule,
    
    ApplicationPipesModule
  ],
  providers: [CurrencyPipe, DatePipe]
})
export class DiariaModule { }
