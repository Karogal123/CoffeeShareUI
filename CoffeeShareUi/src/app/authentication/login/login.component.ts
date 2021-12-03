import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserForAuthentication } from 'src/app/interface/user/userForAuthentication';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm! : FormGroup;
  user! : UserForAuthentication;
  submitted = false;
  public errorMessage: string = '';
  public showError!: boolean;
  private _returnUrl!: string;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(){
    this.userForm = this.formBuilder.group({  
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.userForm.controls; }

  get Email(){
    return this.userForm.get('email');
  }
  get Password(){
    return this.userForm.get('password');
  }

  onSubmit(){
    this.submitted = true;
    this.showError = false;
    if(this.userForm.invalid){
      return;
    }
    const login = {... this.userForm.value};
    const userForAuth: UserForAuthentication = {
      email: login.email,
      password: login.password
    }
    this.userService.loginUser("users/login", userForAuth)
    .subscribe(res =>{
      localStorage.setItem("token", res.token);
      this.userService.sendAuthStateChangeNotification(res.isAuthSuccessful);
      this._router.navigate([this._returnUrl]);
  },
  error =>{
    this.errorMessage = error;
    this.showError = true;
  });
  }
} 