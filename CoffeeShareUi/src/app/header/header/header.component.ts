import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isUserAuthenticated: boolean = false;
  public isUserAdmin: boolean = false;
  constructor(public userService: UserService, private _router: Router) {
    this.userService.authChanged
    .subscribe(res => {
      this.isUserAuthenticated = res;
    })
    this.userService.adminChanged
    .subscribe(res => this.isUserAdmin = res);
  console.log(this.isUserAdmin)
  }
  
  ngOnInit(): void {
    this.userService.authChanged
    .subscribe(res => {
      this.isUserAuthenticated = res;
    })
    this.userService.adminChanged
    .subscribe(res => this.isUserAdmin = res);
  console.log(this.isUserAdmin)
    
  }
  public logout = () => {
    this.userService.logout();
    this._router.navigate(["/"]);
  }
}
