import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForRegistration } from 'src/app/interface/user/userForRegistration';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  userForm! : FormGroup;
  user! : UserForRegistration;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private _router: Router) { }

  ngOnInit(){
    this.userForm = this.formBuilder.group({  
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,}')]]
    })
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
    if(this.userForm.invalid){
      return;
    }
    this.user = this.userForm.value;
    this.userService.registerUser("users/register", this.user)
    .subscribe(data =>{
      console.log("Successful registration");
  },
  error =>{
    console.log(error.error.errors);
  });
  this._router.navigate(["/authentication/login"]);
  }
} 