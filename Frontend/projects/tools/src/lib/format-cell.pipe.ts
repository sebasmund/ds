import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Pipe({ name: 'formatCell' })
export class FormatCellPipe implements PipeTransform {
    constructor (
        private currencyPipe: CurrencyPipe, private datePipe:DatePipe
    ) { }
    transform(value: any, format: string) {
       
        if ( value === undefined ) {
            return 'not available';
        }        if ( format === 'default' ) {
            if ( Array.isArray(value) ) {
                if ( typeof value[0] !== 'object' ) {
                    return value.join(', ');
                } else {
                    return value.map( obj => {
                        return obj.name
                    }).join(', ');
                }
            }
            if ( typeof value === "object") {
                return value.name
            }
        }
        
        if (format === 'currency') {
            return this.currencyPipe.transform(value, 'Bs. ');
        }
        if (format === 'dolar') {
            return this.currencyPipe.transform(value, '$ ');
        }
        if (format === 'date') {
            return this.datePipe.transform(value, 'dd/MM/yyyy');
        }
        if (format === 'phone') {
            return this.datePipe.transform(value, '(LLL) 000-0000');
        }
        return value;
    }
}