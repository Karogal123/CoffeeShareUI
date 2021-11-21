import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { RegisterModel } from './RegisterModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm! : FormGroup;
  user! : RegisterModel;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

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
    this.userService.Register(this.user).subscribe(res => { console.log(res)});
  }

} 
