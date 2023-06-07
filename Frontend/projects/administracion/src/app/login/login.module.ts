import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../tools/src/lib/material/material.module';
import { ToolsModule } from '../../../../tools/src/public-api';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    ToolsModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class LoginModule { }
