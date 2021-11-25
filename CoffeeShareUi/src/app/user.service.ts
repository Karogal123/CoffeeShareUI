import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';    
import {Observable} from 'rxjs';    

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly ApiUrl = "http://localhost:44331/api"
  constructor(private http: HttpClient) { }

  logInUser(login:any, pwd:any){
    return this.http.post(this.ApiUrl + '/Users/Login', login, pwd);
  }
  registerUser(login:any, pwd:any){
    return this.http.post(this.ApiUrl + '/Users/Register', login, pwd);
  }
  logOutUser(){
    return this.http.get(this.ApiUrl + '/Users/LogOut');
  }
}
