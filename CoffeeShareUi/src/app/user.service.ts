import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from './login/LoginModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly ApiUrl = "https://localhost:44331/users"
  constructor(private http: HttpClient) { }

  LogIn(email:any, password:any){
    return this.http.post(this.ApiUrl + '/Login', email, password);
  }
  Register(loginModel: LoginModel){
    return this.http.post(this.ApiUrl + '/Register', loginModel, this.generateHeaders());
  }
  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
  }; 
}
