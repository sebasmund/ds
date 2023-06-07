import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import { LoginService } from '../../../administracion/src/app/login/login.service';


@Injectable({ providedIn:'root'})
export class AuthGuard implements CanActivate{
    constructor(private router: Router, private apiauthService: LoginService){

    }
    canActivate(route: ActivatedRouteSnapshot){
        const usuario=this.apiauthService.usuarioData;
        if(!usuario)
        {
            this.router.navigate(['/login']);
            return false;
        }   else{
            return true;
        }     
       

    }
}