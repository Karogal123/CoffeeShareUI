import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css']
})
export class CoffeeComponent implements OnInit {
  ModalTitle:string="";
  coffee: any;
  CoffeeManufacturerFilter: string ="";
  CoffeeNameFilter: string ="";
  ActiveAddEdditCoffee:boolean=false;
  constructor(private service:SharedService) { }

  CoffeeList: any = [];
  CoffeeListFiltered: any = [];

  ngOnInit(): void {
    this.refreshCoffeeList();
  }

  refreshCoffeeList(){
    this.service.getCoffees().subscribe(data => {
      this.CoffeeList=data;
      this.CoffeeListFiltered = data;
      console.log(this.CoffeeListFiltered);
    })
  }
  addClick(){
    this.coffee={
      id:0,
      name:"",
      manufacturerId:"",
      countryId:"",
      beansProcessing:"",
      degreeOfRoasting:"",
      beanType:"",
      imgUrl:""
    }
    this.ModalTitle="Add coffee";
    this.ActiveAddEdditCoffee=true;
  }

  editClick(coffeeEdit: any){
    this.coffee=coffeeEdit;
    this.ModalTitle="Edit coffeee";
    this.ActiveAddEdditCoffee=true;
  }

  closeClick(){
    this.ActiveAddEdditCoffee=false;
    this.refreshCoffeeList();
  }

  deleteClick(coffeeDelete: any){
    this.service.deleteCoffee(coffeeDelete).subscribe(data => this.refreshCoffeeList());
  }

  Filterfn(){
    var CoffeeManufacturerFilter = this.CoffeeManufacturerFilter;
    var CoffeeNameFilter = this.CoffeeNameFilter;
    this.CoffeeListFiltered = this.CoffeeList.filter(function (el : any){
      return el.manufacturer.name.toString().toLowerCase().includes(CoffeeManufacturerFilter.toString().trim().toLowerCase()
      )&&el.name.toString().toLowerCase().includes(CoffeeNameFilter.toString().trim().toLowerCase())
    });
  }
}
