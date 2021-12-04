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
  ManufacturerNameFilter: string="";
  ActiveAddEditManufacturer:boolean=false;
  constructor(private service:SharedService) { }

  ManufacturerList: any = [];
  ManufacturerListFiltered: any = [];

  ngOnInit(): void {
    this.refreshManufacturerList();
  }

  refreshManufacturerList(){
    this.service.getManufacturers().subscribe(data => {
      this.ManufacturerList=data;
      this.ManufacturerListFiltered = data;
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

  Filterfn(){
    var ManufacturerNameFilter = this.ManufacturerNameFilter;
    this.ManufacturerListFiltered = this.ManufacturerList.filter(function (el : any){
      return el.name.toString().toLowerCase().includes(ManufacturerNameFilter.toString().trim().toLowerCase())
    });
  }
}

