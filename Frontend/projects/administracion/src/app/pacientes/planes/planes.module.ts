import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { PlanesComponent } from './planes.component';
import { Filter } from '../datos/Filter';
import { MaterialModule } from 'projects/tools/src/lib/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { PlanesRoutingModule } from './planes-routing.module';
import { ApplicationPipesModule } from '../../../../../tools/src/lib/ApplicationPipesModule';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NuevoPlanComponent } from './nuevo-plan/nuevo-plan.component';

@NgModule({
  declarations: [
   
    PlanesComponent,
        NuevoPlanComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PlanesRoutingModule, 
    FormsModule, 
    ReactiveFormsModule, 
    NgxMaskModule.forRoot(),
    ApplicationPipesModule,
    NgCircleProgressModule.forRoot({})

  ],
  providers: [CurrencyPipe, DatePipe]
})
export class PlanesModule { }
