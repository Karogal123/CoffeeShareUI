import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../shared/repository.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {
  
  public claims: any[] =[];
  constructor(private _repository: RepositoryService) { }
  ngOnInit(): void {
    this.getClaims();
  }
  public getClaims = () =>{
    this._repository.getData('users/privacy')
    .subscribe(res => {
      this.claims = res as [];
    })
  }
}