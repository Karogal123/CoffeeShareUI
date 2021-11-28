import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  @Input() recipe : any;
  public comments: any = [];
  constructor(private route: ActivatedRoute,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    this.route.params
    .subscribe((params: Params) => {
      const id = params['id'];
      this.sharedService.getRecipeById(id).subscribe(recipe =>{
        this.recipe = recipe
        this.recipe.user.email.substring(0, this.recipe.user.email.lastIndexOf('@'));
        console.log(recipe);
        console.log(id);
      })
    });

    this.route.params
    .subscribe((params: Params) => {
      const id = params['id'];
      this.sharedService.getCommentsForRecipe(id).subscribe(comments =>{
        this.comments = comments
        console.log(comments);
        console.log(id);
      })
  });
}
  
  getRecipe() : void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.sharedService.getRecipeById(id).subscribe(recipe => this.recipe = recipe);
    console.log("value: ", this.recipe);
  }
}
