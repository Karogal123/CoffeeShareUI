import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-add-edit-manufacturer',
  templateUrl: './add-edit-manufacturer.component.html',
  styleUrls: ['./add-edit-manufacturer.component.css']
})
export class AddEditManufacturerComponent implements OnInit {

  @Input() manufacturer: any;
  ManufacturerId!: number ;
  ManufacturerName: string="";
  constructor(private service : SharedService) { }

  ngOnInit(): void {
    this.ManufacturerId = this.manufacturer.id;
    this.ManufacturerName = this.manufacturer.name;
  }

  addManufacturer(){
    var val = {
      id:this.ManufacturerId,
      name:this.ManufacturerName
    };
    this.service.createManufacturer(val).subscribe( ()=>{
      alert("Successfully added");
    });
  }
  updateManufacturer(){
    var val = {
      id:this.ManufacturerId,
      name:this.ManufacturerName
    };
    this.service.updateManufactutrer(val).subscribe(()=>{
      alert("Successfully updated");
    });
  }
}
