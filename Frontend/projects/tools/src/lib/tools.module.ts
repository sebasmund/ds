import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { MessageboxComponent } from './messagebox.component';
import { SnackbarComponent } from 'projects/tools/src/lib/snackbar.component';
import { AutoFocus } from './auto-focus.directive';



@NgModule({
  declarations: [
     SnackbarComponent, MessageboxComponent, AutoFocus
  ],
  imports: [
    MaterialModule
  ],
  exports: [
    SnackbarComponent, MessageboxComponent, AutoFocus, MaterialModule
  ]
})
export class ToolsModule { }
