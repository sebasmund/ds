import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanesDetallesComponent } from './planes-detalles.component';

const routes: Routes = [ { path: '', component: PlanesDetallesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanesDetallesRoutingModule { }