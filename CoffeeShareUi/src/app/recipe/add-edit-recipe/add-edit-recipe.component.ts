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
  RecipeGrindLevel: string ="";
  RecipeWaterAmount: number = 0;
  RecipeWaterTemperature: number = 0;
  CoffeeList: any[] = [];
  unique!: string[];
  groupedArray! : any[];
  constructor(private service : SharedService) { }

  ngOnInit(): void {
    this.RecipeId = this.recipe.id;
    this.RecipeName = this.recipe.name;
    this.RecipeBody = this.recipe.recipeBody;
    this.RecipeUserId = this.recipe.userId;
    this.RecipeIntentedUse = this.recipe.intendedUse;
    this.RecipeCoffeeId = this.recipe.coffeeId;
    this.RecipeGrindLevel = this.recipe.grindLevel;
    this.RecipeWaterAmount = this.recipe.waterAmount;
    this.RecipeWaterTemperature = this.recipe.waterTemperature;
    this.getCoffeesList();
  }

  formatArray() {
    this.unique = [...new Set(this.CoffeeList.map(item => item.manufacturer.name))];
    this.groupedArray = this.unique.map(i => ({
      name: i,
      values: this.CoffeeList.filter(d => d.manufacturer.name === i)
    }))
}

  addRecipe(){
    var val = {
      id:this.RecipeId,
      name:this.RecipeName,
      recipeBody:this.RecipeBody,
      userId: 1,
      intendedUse:this.RecipeIntentedUse,
      coffeeId:this.RecipeCoffeeId,
      grindLevel:this.RecipeGrindLevel,
      waterAmount:this.RecipeWaterAmount,
      waterTemperature:this.RecipeWaterTemperature
    };
    this.service.createRecipe(val).subscribe(()=>{
      alert("Successfully updated");
    });
  }
  updateRecipe(){
    var val = {
      id:this.RecipeId,
      name:this.RecipeName,
      recipeBody:this.RecipeBody,
      userId:this.RecipeUserId,
      intendedUse:this.RecipeIntentedUse,
      coffeeId:this.RecipeCoffeeId,
      grindLevel:this.RecipeGrindLevel,
      waterAmount:this.RecipeWaterAmount,
      waterTemperature:this.RecipeWaterTemperature
    };
    this.service.updateRecipe(val).subscribe(()=>{
      alert("Successfully updated");
    });
  }
  getCoffeesList(){
    this.service.getCoffees().subscribe(data => {
      this.CoffeeList = data;
      this.formatArray();
      console.log(this.groupedArray);
    })
  }
  onKey(event: any){
    this.RecipeBody = event.target.value; 
  }
}
