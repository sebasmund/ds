import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

    @Component({
      selector: 'my-snackbar',
      templateUrl: './snackbar.component.html'
    })
    export class SnackbarComponent implements OnInit {
      constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
     
      }

      ngOnInit() {}

      get getIcon() {
        switch (this.data.snackType) {
          case 'success':
            return 'check_circle_outline';
          case 'error':
            return 'highlight_off';
          case 'warning':
            return 'error_outline';
          case 'info':
            return 'info';
        }
      }
    }