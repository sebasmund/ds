import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    HttpClientModule,UsuarioRoutingModule
  ]
  
})
export class UsuarioModule { }
