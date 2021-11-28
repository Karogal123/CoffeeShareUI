import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private _router: Router){}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) { 
    if (this.userService.isUserAuthenticated()) {
      console.log("true");
      return true;
    }
    this._router.navigate(['/authentication/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
  
}