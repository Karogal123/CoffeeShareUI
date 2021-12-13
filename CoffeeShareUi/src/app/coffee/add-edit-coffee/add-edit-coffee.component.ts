import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-add-edit-coffee',
  templateUrl: './add-edit-coffee.component.html',
  styleUrls: ['./add-edit-coffee.component.css']
})
export class AddEditCoffeeComponent implements OnInit {
  @Input() coffee: any;
  CoffeeId!: number ;
  CoffeeName: string="";
  CoffeeManufacturerId : number = 0;
  CoffeeCountryId! : number;
  CoffeeBeansProcessing: string ="";
  CoffeeDegreeOfRoasting: string ="";
  CoffeeBeanType: string ="";
  CountryList: any[] = [];
  errorMessage: string ="";
  public showError!: boolean;
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
      beanType:this.CoffeeBeanType
    };
    console.log(this.CoffeeManufacturerId)
    this.service.createCoffee(val).subscribe(()=>{
      alert("Successfully added");
    }, error => {
      this.errorMessage = error.errors;
      this.showError = true;
      console.log(this.errorMessage)
    }
    );
  }
  
  updateCoffee(){
    var val = {
      id:this.CoffeeId,
      name:this.CoffeeName,
      manufacturerId:this.CoffeeManufacturerId,
      countryId:this.CoffeeCountryId,
      beansProcessing:this.CoffeeBeansProcessing,
      degreeOfRoasting:this.CoffeeDegreeOfRoasting,
      beanType:this.CoffeeBeanType
    };
    this.service.updateCoffee(val).subscribe(()=>{
      alert("Successfully updated");
    }, error => {
      this.errorMessage = error.errors;
      this.showError = true;
    }
    );
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

  changeManufacturer($event : number){
    this.CoffeeManufacturerId = $event
    console.log(this.CoffeeManufacturerId)
  }
  changeCountry($event: number){
    this.CoffeeCountryId = $event
  }
}
