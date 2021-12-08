import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { AuthResponse } from '../interface/user/AuthResponse';
import { RegistrationResponse } from '../interface/user/registrationResponse';
import { UserForAuthentication } from '../interface/user/userForAuthentication';
import { UserForRegistration } from '../interface/user/userForRegistration';
import { EnvironmentUrlService } from './environment-url.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _authChangeSub = new ReplaySubject<boolean>(1);
  public authChanged = this._authChangeSub.asObservable();

  private _adminChangeSub = new ReplaySubject<boolean>(1);
  public adminChanged = this._adminChangeSub.asObservable();

  constructor(private _http: HttpClient, private _envUrl: EnvironmentUrlService, private _jwtHelper: JwtHelperService) { 
  }

  public registerUser = (route: string, body: UserForRegistration) => {
    return this._http.post<RegistrationResponse> (this.createCompleteRoute(route, this._envUrl.urlAddress), body);
  }
  public loginUser = (route: string, body: UserForAuthentication) => {
    return this._http.post<AuthResponse>(this.createCompleteRoute(route, this._envUrl.urlAddress), body);
  }
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
  public logout = () => {
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
    this.sendAdminChangeState(false);
  }
  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this._authChangeSub.next(isAuthenticated);
  }
  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");
    
    return token != null && this._jwtHelper.isTokenExpired(token) == false;
  }
  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
        }),
    };
  };

  public sendAdminChangeState = (isAdmin: boolean) => {
    this._adminChangeSub.next(isAdmin);
  }

  public isUserAdmin = (): boolean => {
    var token = localStorage.getItem("token");
    const decodedToken = this._jwtHelper.decodeToken(token!)!
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    if(role == 'Admin'){
      this._adminChangeSub.next(true);
      return true;
    }
    if(role !== 'Admin'){
      this._adminChangeSub.next(false);
      return false;
    }
    return false;
} 

 get isUserAdminGetter(): boolean  {
  var token = localStorage.getItem("token");
  const decodedToken = this._jwtHelper?.decodeToken(token!) || {};
  const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
  return role === 'Admin';
} 
}
