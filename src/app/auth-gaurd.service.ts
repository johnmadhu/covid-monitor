import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {
  constructor(public rtr:Router, public authService: AuthService){}
   canActivate(
      next:ActivatedRouteSnapshot,
      state:RouterStateSnapshot):boolean{
        // if(localStorage.getItem('uname') === null && localStorage.getItem('pword') === null){
        //   return false;
        //   this.rtr.navigate(["login"]);
        // }else

         if(localStorage.getItem('uname') === "test" && localStorage.getItem('pword') === "test"){   
          return true;
          this.rtr.navigate(["home"]);
        }else{
          this.rtr.navigate(['login']);
          alert('Enter valid username & password')
          return false;
         
        }
      }
    
  // constructor(public authService: AuthService, public router: Router) { }
  
}
