import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  ModalTitle:string="";
  recipe: any;
  ActiveAddEdditRecipe:boolean=false;
  public isUserAuthenticated: boolean = false;
  constructor(private service:SharedService, private userService: UserService) { }

  RecipeList: any = [];
  
  ngOnInit(): void {
    this.refreshRecipeList();
    this.userService.authChanged
    .subscribe(res => {
      this.isUserAuthenticated = res;
    })
  }

  refreshRecipeList(){
    this.service.getRecipes().subscribe(data => {
      this.RecipeList=data;
    })
  }
  addClick(){
    this.recipe={
      id:0,
      name:"",
      recipeBody:"",
      userId:"",
      intendedUse:"",
      coffeeId:""
    }
    this.ModalTitle="Add recipe";
    this.ActiveAddEdditRecipe=true;
  }

  editClick(recipeEdit: any){
    this.recipe=recipeEdit;
    this.ModalTitle="Edit recipe";
    this.ActiveAddEdditRecipe=true;
  }

  closeClick(){
    this.ActiveAddEdditRecipe=false;
    this.refreshRecipeList();
  }

  deleteClick(recipeDelete: any){
    this.service.deleteRecipe(recipeDelete).subscribe(data => this.refreshRecipeList());
  }

}
