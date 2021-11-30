import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  public TagList : any = [];
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.refreshTagList();
  }

  refreshTagList(){
    this.sharedService.getTags().subscribe(tags => {
      this.TagList = tags;
      console.log(this.TagList);
    })
  }

}
