import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AgendaComponent } from './agenda/agenda.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'agenda', component: AgendaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

 }
