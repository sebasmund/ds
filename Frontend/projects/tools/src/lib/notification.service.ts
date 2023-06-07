import { Injectable } from '@angular/core';
import { MatSnackBar} from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar.component';


@Injectable()

export class NotificationService {
  _snackType: string;
  constructor(private snackBar: MatSnackBar) { }

  public openSnackBar(message: string, action: string, snackType?: string) {
    this._snackType =  snackType !== undefined ? snackType : 'Success';

    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: this._snackType,
      data: { message: message, snackType: this._snackType }
    });
  }


 


}