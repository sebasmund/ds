import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'Filter',
  pure: false
})


export class Filter implements PipeTransform {
  transform(conc: any[], filter: any): any {
    if (!conc || !filter) {
      return conc;
  }
  
 
   return conc.filter(item =>
    item.co_edo.toString()==filter
  );
  
  }
}
