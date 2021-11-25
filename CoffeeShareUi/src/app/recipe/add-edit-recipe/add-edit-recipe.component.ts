import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-add-edit-recipe',
  templateUrl: './add-edit-recipe.component.html',
  styleUrls: ['./add-edit-recipe.component.css']
})
export class AddEditRecipeComponent implements OnInit {
  @Input() recipe: any;
  RecipeId!: number ;
  RecipeName: string="";
  RecipeBody : string="";
  RecipeUserId : number = 0;
  RecipeIntentedUse: string ="";
  RecipeCoffeeId: string ="";
  CoffeeList: any[] = [];
  constructor(private service : SharedService) { }

  ngOnInit(): void {
    this.RecipeId = this.recipe.id;
    this.RecipeName = this.recipe.name;
    this.RecipeBody = this.recipe.recipeBody;
    this.RecipeUserId = this.recipe.userId;
    this.RecipeIntentedUse = this.recipe.intendedUse;
    this.RecipeCoffeeId = this.recipe.coffeeId;
    this.getCoffeesList();
  }

  addRecipe(){
    var val = {
      id:this.RecipeId,
      name:this.RecipeName,
      recipeBody:this.RecipeBody,
      userId: 1,
      intendedUse:this.RecipeIntentedUse,
      coffeeId:this.RecipeCoffeeId
    };
    this.service.createRecipe(val).subscribe(res=>{
      alert(res.toString());
    });
  }
  updateRecipe(){
    var val = {
      id:this.RecipeId,
      name:this.RecipeName,
      recipeBody:this.RecipeBody,
      userId:this.RecipeUserId,
      intendedUse:this.RecipeIntentedUse,
      coffeeId:this.RecipeCoffeeId
    };
    this.service.updateRecipe(val).subscribe(res=>{
      alert(res.toString());
    });
  }
  getCoffeesList(){
    this.service.getCoffees().subscribe(data => {
      this.CoffeeList = data;
    })
  }
}
