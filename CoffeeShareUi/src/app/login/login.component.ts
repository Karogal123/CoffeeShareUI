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
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.minLength(6), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=!()*]).{6,}$")]
    })
  }

  get Email(){
    return this.userForm.get('email');
  }
  get Password(){
    return this.userForm.get('password');
  }

  onSubmit(){
    this.subbmited = true;
    if(this.userForm.invalid){
      return;
    }
    this.user = this.userForm.value;
    this.userService.Register(this.user).subscribe(res => { console.log(res)});
  }

}
