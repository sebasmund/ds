import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from '../../../tools/src/lib/material/material.module';
import { JwtInterceptor } from '../../../tools/src/lib/jwt.interceptor';
import { NotificationService } from '../../../tools/src/lib/notification.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { SnackbarComponent } from '../../../tools/src/lib/snackbar.component';
import { MessageboxComponent } from '../../../tools/src/lib/messagebox.component';
import { ToolsModule } from 'projects/tools/src/public-api';
import { BarraComponent } from './barra/barra.component';
import { PrintComponent } from './print/print.component';
import { PacienteComponent } from './pacientes/paciente.component';
import { AgendaComponent } from './agenda/agenda.component';
import { GlobalComponent } from './agenda/global/global.component';
import { NgxMaskModule } from 'ngx-mask';
import { DarcitaComponent } from './agenda/darcita/darcita.component';
import { PiezasComponent } from './piezas/piezas.component';


const routes: Routes = [
  
    {path: 'agenda',
    component: AgendaComponent,
    children: [
      {

        path: 'diaria',
        loadChildren: () =>
          import('./agenda/diaria/diaria.module').then(
            m => m.DiariaModule
          )
      },
      {

        path: 'semanal',
        loadChildren: () =>
          import('./agenda/semanal/semanal.module').then(
            m => m.SemanalModule
          )
      }
      ,
      {

        path: 'global',
        loadChildren: () =>
          import('./agenda/global/global.module').then(
            m => m.GlobalModule
          )
      } 
    ]
  },

  {
    path: 'paciente',
    component: PacienteComponent,
    children: [
      {

        path: 'datos',
        loadChildren: () =>
          import('./pacientes/datos/datos.module').then(
            m => m.DatosModule
          )
      },
      {

        path: 'datos2/:id',
        loadChildren: () =>
          import('./pacientes/datos copy/datos.module').then(
            m => m.Datos2Module
          )
      },
      {

        path: 'imagenes/:id',
        loadChildren: () =>
          import('./pacientes/imagenes/imagenes.module').then(
            m => m.ImagenesModule
          )
      },
      {

        path: 'planes/:id',
        loadChildren: () =>
          import('./pacientes/planes/planes.module').then(
            m => m.PlanesModule
          )
      },
      {

        path: 'planes/:id/detalles/:id2',
        loadChildren: () =>
          import('./pacientes/planes-detalles/planes-detalles.module').then(
            m => m.PlanesDetallesModule
          )
      },
      {

        path: 'odontograma/:id',
        loadChildren: () =>
          import('./pacientes/odontograma/odontograma.module').then(
            m => m.OdontogramaModule
          )
      }
    ]
  },

  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  }
];

@NgModule({
  declarations: [
    AppComponent, 
   BarraComponent, 
    PrintComponent, 
    PacienteComponent, 
    AgendaComponent, 
    GlobalComponent, 
    DarcitaComponent,  
    PiezasComponent, 
  ],
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(routes),

    
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToolsModule,
     NgxMaskModule.forRoot()

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }, NotificationService],
  bootstrap: [AppComponent],
  entryComponents: [
    SnackbarComponent,
    MessageboxComponent
  ]
})
export class AppModule { }
