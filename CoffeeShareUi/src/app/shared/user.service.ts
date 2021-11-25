import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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
  private _authChangeSub = new Subject<boolean>()
  public authChanged = this._authChangeSub.asObservable();
  
  constructor(private _http: HttpClient, private _envUrl: EnvironmentUrlService, private _jwtHelper: JwtHelperService) { }

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
  }
  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this._authChangeSub.next(isAuthenticated);
  }
  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");
 
    return token && !this._jwtHelper.isTokenExpired(token) || false;
  }
}
