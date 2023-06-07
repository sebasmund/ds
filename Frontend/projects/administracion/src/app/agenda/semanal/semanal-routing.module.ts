import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SemanalComponent } from './semanal.component';

const routes: Routes = [ { path: '', component: SemanalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SemanalRoutingModule { }