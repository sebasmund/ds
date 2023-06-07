import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { formatDate } from '@angular/common';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from '../app/login/login.service';
import { UsuarioRes } from '../../../tools/src/lib/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  userActivity: any;
  userInactive: Subject<any> = new Subject();


  @ViewChild('drawer') drawer: any;
  public selectedItem: string = '';
  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  title = 'DentalStyle';
  token: UsuarioRes;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public service: LoginService,
    private router: Router,
    private apiauthService: LoginService,
    private _snackBar: MatSnackBar
  ) {
   
    this.service.usuario.subscribe(res => {
      this.token = res;
    })
    this.setTimeout();
    this.userInactive.subscribe(() => {
      const miSnack = this._snackBar.open('60 min. Inactivo.', 'Deshacer', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: 'warning'
      });

      var res = false;
      miSnack.onAction().subscribe(() => {
        this.setTimeout();
        res = true;
      })
      miSnack.afterDismissed().subscribe(() => {
        if (!res) {
          this.apiauthService.logout();
          this.router.navigate(['/login']);
        }

      })

    });
 
 
  }

  ngOnInit(): void {


  }


  onLogouton(): void {


    this.service.logout();
    this.router.navigate(['login']);
  }
keyPress(event: KeyboardEvent): void {
  clearTimeout(this.userActivity);
  this.setTimeout();
}
setTimeout() {
  this.userActivity = setTimeout(() => this.userInactive.next(undefined), 1000 * 60 * 60);
}

@HostListener('window:mousemove') refreshUserState() {
  clearTimeout(this.userActivity);
  this.setTimeout();

}
@HostListener('window:touchmove') refreshUserState2() {
  clearTimeout(this.userActivity);
  this.setTimeout();

}
}
