import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css']
})
export class CoffeeComponent implements OnInit {

  constructor(private service:SharedService) { }

  CoffeeList: any = [];

  ngOnInit(): void {
    this.refreshCoffeeList();
  }

  refreshCoffeeList(){
    this.service.getCoffees().subscribe(data => {
      this.CoffeeList=data;
    })
  }
}
