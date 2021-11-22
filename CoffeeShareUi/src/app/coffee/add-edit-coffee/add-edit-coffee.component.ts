import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-coffee',
  templateUrl: './add-edit-coffee.component.html',
  styleUrls: ['./add-edit-coffee.component.css']
})
export class AddEditCoffeeComponent implements OnInit {
  @Input() coffee: any;
  CoffeeId!: number ;
  CoffeeName: string="";
  CoffeeManufacturerId! : number;
  CoffeeCountryId! : number;
  CoffeeBeansProcessing: string ="";
  CoffeeDegreeOfRoasting: string ="";
  CoffeeBeanType: string ="";
  CoffeeImgUrl: string ="";
  CountryList: any[] = [];
  ManufacturerList: any[] = [];
  constructor(private service : SharedService) { }

  ngOnInit(): void {
    this.CoffeeId = this.coffee.id;
    this.CoffeeName = this.coffee.name;
    this.CoffeeManufacturerId = this.coffee.manufacturerId;
    this.CoffeeCountryId = this.coffee.countryId;
    this.CoffeeBeansProcessing = this.coffee.beansProcessing;
    this.CoffeeDegreeOfRoasting = this.coffee.degreeOfRoasting;
    this.CoffeeBeanType = this.coffee.beanType;
    this.CoffeeImgUrl = this.coffee.imgUrl;
    this.getCountryList();
    this.getManufacturerList();
  }

  addCoffee(){
    var val = {
      id:this.CoffeeId,
      name:this.CoffeeName,
      manufacturerId:this.CoffeeManufacturerId,
      countryId:this.CoffeeCountryId,
      beansProcessing:this.CoffeeBeansProcessing,
      degreeOfRoasting:this.CoffeeDegreeOfRoasting,
      beanType:this.CoffeeBeanType,
      imgUrl:this.CoffeeImgUrl
    };
    this.service.createCoffee(val).subscribe(res=>{
      alert(res.toString());
    });
  }
  updateCoffee(){
    var val = {
      id:this.CoffeeId,
      name:this.CoffeeName,
      manufacturerId:this.CoffeeManufacturerId,
      countryId:this.CoffeeCountryId,
      beansProcessing:this.CoffeeBeansProcessing,
      degreeOfRoasting:this.CoffeeDegreeOfRoasting,
      beanType:this.CoffeeBeanType,
      imgUrl:this.CoffeeImgUrl
    };
    this.service.updateCoffee(val).subscribe(res=>{
      alert(res.toString());
    });
  }
  getCountryList(){
    this.service.getCountries().subscribe(data => {
      this.CountryList = data;
    })
  }
  getManufacturerList(){
    this.service.getManufacturers().subscribe(data => {
      this.ManufacturerList = data;
    })
  }
}
