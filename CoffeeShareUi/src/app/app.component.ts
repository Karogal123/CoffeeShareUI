import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CoffeeShareUi';
  constructor(private userService: UserService){
  }
  ngOnInit(): void {
    if(this.userService.isUserAuthenticated())
      this.userService.sendAuthStateChangeNotification(true);
  }
}
