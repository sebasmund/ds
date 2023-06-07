import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiariaComponent } from './diaria.component';

const routes: Routes = [ { path: '', component: DiariaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiariaRoutingModule { }