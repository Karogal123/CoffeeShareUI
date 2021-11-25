import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent implements OnInit {
  ModalTitle:string="";
  manufacturer: any;
  ActiveAddEditManufacturer:boolean=false;
  constructor(private service:SharedService) { }

  ManufacturerList: any = [];
  
  ngOnInit(): void {
    this.refreshManufacturerList();
  }

  refreshManufacturerList(){
    this.service.getManufacturers().subscribe(data => {
      this.ManufacturerList=data;
    })
  }
  addClick(){
    this.manufacturer={
      id:0,
      name:""
    }
    this.ModalTitle="Add manufacturer";
    this.ActiveAddEditManufacturer=true;
  }

  editClick(manufacturerEdit: any){
    this.manufacturer=manufacturerEdit;
    this.ModalTitle="Edit manufacturer";
    this.ActiveAddEditManufacturer=true;
  }

  closeClick(){
    this.ActiveAddEditManufacturer=false;
    this.refreshManufacturerList();
  }

  deleteClick(manufacturerDelete: any){
    this.service.deleteManufacturer(manufacturerDelete).subscribe(data => this.refreshManufacturerList());
  }

}
