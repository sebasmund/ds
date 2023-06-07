// application-pipes.module.ts
// other imports
import { NgModule } from '@angular/core';
import { FormatCellPipe } from './format-cell.pipe';


@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [ 
    FormatCellPipe
  ],
  exports: [
    FormatCellPipe
  ]
})
export class ApplicationPipesModule {}