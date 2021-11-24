import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { LoginModel } from './LoginModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm! : FormGroup;
  user! : LoginModel;
  subbmited = false;
  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(){
    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get Email(){
    return this.userForm.get('email');
  }
  get Password(){
    return this.userForm.get('password');
  }

  onSubmit(){
    this.user = this.userForm.value;
    this.userService.LogIn(this.user).subscribe(res => { console.log(res)});
  }

}
