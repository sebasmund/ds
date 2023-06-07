import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../tools/src/lib/notification.service';
import { UsuarioRes } from '../../../../tools/src/lib/usuario';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public service: LoginService,
    private router: Router,
    private notification: NotificationService,) {


    if (this.service.usuarioData) {
      this.router.navigate(['agenda'], { replaceUrl: true });

    } else {


      this.router.navigate(['login'], { replaceUrl: true });
    }
  }


  login() {
    console.log('login')
    this.service.login(this.service.form.get('user').value, this.service.form.get('password').value).subscribe({
      next: (resp) => {
        console.log('llegamos')
        if (resp.status == 1) {
          const usuario: UsuarioRes = resp.data;
          localStorage.setItem('usuario', JSON.stringify(usuario));
          console.log('sirve')
          this.service.usuarioSubject.next(usuario);
          this.router.navigate(['agenda'], { replaceUrl: true });
        } else {
          this.notification.openSnackBar(resp.mensaje, '', 'error');
        }
      },
      error: (err) => {
        console.log(err);
        if (err.status == 400 || err.status == 500)
          this.notification.openSnackBar(err.error.Msg, '', 'error');
        else
          this.notification.openSnackBar(err, '', 'error');
      }
    });
  }
}

