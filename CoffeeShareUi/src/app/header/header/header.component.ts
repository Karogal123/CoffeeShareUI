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
  constructor(private userService: UserService, private _router: Router) {
    this.userService.authChanged
    .subscribe(res => {
      this.isUserAuthenticated = res;
    })
  }
  
  ngOnInit(): void {
    this.userService.authChanged
    .subscribe(res => {
      this.isUserAuthenticated = res;
    })
  }
  public logout = () => {
    this.userService.logout();
    this._router.navigate(["/"]);
  }
}
