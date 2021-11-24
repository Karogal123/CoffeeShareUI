import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from './login/LoginModel';
import { RegisterModel } from './register/RegisterModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly ApiUrl = "https://localhost:44331/users"
  constructor(private http: HttpClient) { }

  LogIn(loginModel: LoginModel){
    return this.http.post(this.ApiUrl + '/Login', loginModel, this.generateHeaders());
  }
  Register(loginModel: RegisterModel){
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
