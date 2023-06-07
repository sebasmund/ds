import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../../tools/src/lib/material/material.module';
import { GlobalRoutingModule } from './global-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    GlobalRoutingModule
  ]
})
export class GlobalModule { }
