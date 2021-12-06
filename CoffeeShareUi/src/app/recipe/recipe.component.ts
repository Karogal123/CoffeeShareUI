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
  CoffeeNameFilter: string = "";
  ActiveAddEdditRecipe:boolean=false;
  selectedIntededUse: string ="";
  public isUserAuthenticated: boolean = false;
  constructor(private service:SharedService, private userService: UserService) { 
    this.userService.authChanged
    .subscribe(res => {
      this.isUserAuthenticated = res;
    })
  }

  RecipeList: any = [];
  RecipeListFiltered : any = [];
  
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
      this.RecipeListFiltered=data;
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

  Filterfn(){
    var CoffeeNameFilter = this.CoffeeNameFilter;
    var selectedIntededUse = this.selectedIntededUse;
    this.RecipeListFiltered = this.RecipeList.filter(function (el : any){
      return el.name.toString().toLowerCase().includes(CoffeeNameFilter.toString().trim().toLowerCase()
      )&&el.intendedUse.toString().toLowerCase().includes(selectedIntededUse.toString().trim().toLowerCase())
    });
    console.log(CoffeeNameFilter);
    console.log(selectedIntededUse);
  }

}
