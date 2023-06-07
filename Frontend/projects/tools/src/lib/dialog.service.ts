import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageboxComponent } from './messagebox.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog : MatDialog) { }
  
    openConfirmDialog(title : string, msg : string, button1 : string, button2 : string){
      return this.dialog.open(MessageboxComponent,{
        width : '390px',
        panelClass : 'confirm-dialog-container',
        disableClose : true,
        data:{title : title, message:msg, button1:button1, button2:button2}
    });
    
  }
}
