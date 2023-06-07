import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse  } from "@angular/common/http";
import { Observable, throwError  } from "rxjs";
import { Router } from "@angular/router";
import { catchError } from "rxjs/operators";
import { LoginService } from "../../../administracion/src/app/login/login.service";
import { NotificationService } from "./notification.service";
import { UsuarioRes } from "./usuario";


@Injectable()

export class JwtInterceptor implements HttpInterceptor{

    constructor(private router: Router,
      private apiauthService: LoginService,
      private notification: NotificationService){
        
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
      const usuario: UsuarioRes = JSON.parse(localStorage.getItem('usuario'));
      
        if(usuario){
         
          request = request.clone({
                setHeaders:{
                  Authorization: `Bearer ${usuario.token}`
                  
                }
            });
            
        } 
         
        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {
              this.notification.openSnackBar(err.status.toString() + ' ' +  err.message ,'','error');
              if (err.status === 401 || err.status === 403 ) {
                
                this.apiauthService.logout();
                this.router.navigate(['/login']);
               
             }
             
             return throwError(() => new Error(err.message));
      
            })
          );
    }

    
}