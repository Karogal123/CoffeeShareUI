import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
  errorMessage: string ="";
  public showError!: boolean;
  RecipeName: string="";
  RecipeBody : string ="";
  RecipeUserId : number = 0;
  RecipeIntentedUse: string ="";
  RecipeCoffeeId: string ="";
  RecipeGrindLevel: string ="";
  RecipeWaterAmount: number = 0;
  RecipeCoffeeAmount: number = 0;
  RecipeWaterTemperature: number = 0;
  CoffeeList: any[] = [];
  unique!: string[];
  groupedArray! : any[];
  step1: string = "";
  step2: string = "";
  step3: string = "";
  step4: string = "";
  step5: string = "";
  step6: string = "";
  step7: string = "";
  step8: string = "";
  step9: string = "";
  step10: string = "";
  steps: string = "";
  stepsArray: any[] = [];
  constructor(private service : SharedService) { }

  ngOnInit(): void {
    this.step1 =  this.recipe.recipeBody[0]
    this.step2 = this.recipe.recipeBody[1]
    this.step3 = this.recipe.recipeBody[2]
    this.step4 = this.recipe.recipeBody[3]
    this.step5 = this.recipe.recipeBody[4]
    this.step6 = this.recipe.recipeBody[5]
    this.step7 = this.recipe.recipeBody[6]
    this.step8 = this.recipe.recipeBody[7]
    this.step9 = this.recipe.recipeBody[8]
    this.step10 = this.recipe.recipeBody[9]
    this.RecipeId = this.recipe.id;
    this.RecipeName = this.recipe.name;
    this.RecipeBody = this.recipe.recipeBody;
    console.log(this.recipe.recipeBody)
    this.RecipeUserId = this.recipe.userId;
    this.RecipeIntentedUse = this.recipe.intendedUse;
    this.RecipeCoffeeId = this.recipe.coffeeId;
    this.RecipeGrindLevel = this.recipe.grindLevel;
    this.RecipeWaterAmount = this.recipe.waterAmount;
    this.RecipeWaterTemperature = this.recipe.waterTemperature;
    this.RecipeCoffeeAmount = this.recipe.coffeeAmount;
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
    this.steps = this.step1 + '&' + this.step2 + '&' + this.step3 + '&' + this.step4 + '&' + this.step5 + '&' + this.step6 + '&' + this.step7 + '&' + this.step8 + '&' + this.step9 + '&' + this.step10 + '&';
    this.RecipeBody = this.steps
    var val = {
      id:this.RecipeId,
      name:this.RecipeName,
      recipeBody:this.RecipeBody,
      userId: 1,
      intendedUse:this.RecipeIntentedUse,
      coffeeId:this.RecipeCoffeeId,
      grindLevel:this.RecipeGrindLevel,
      waterAmount:this.RecipeWaterAmount,
      waterTemperature:this.RecipeWaterTemperature,
      coffeeAmount:this.RecipeCoffeeAmount
    };
    this.service.createRecipe(val).subscribe(()=>{
      alert("Successfully updated");
    }, error => {
      this.errorMessage = error.errors;
      this.showError = true;
      console.log(this.errorMessage)
    }
    );
  }
  updateRecipe(){
    this.steps = this.step1 + '&' + this.step2 + '&' + this.step3 + '&' + this.step4 + '&' + this.step5 + '&' + this.step6 + '&' + this.step7 + '&' + this.step8 + '&' + this.step9 + '&' + this.step10 + '&';
    this.RecipeBody = this.steps
    var val = {
      id:this.RecipeId,
      name:this.RecipeName,
      recipeBody:this.RecipeBody,
      userId:this.RecipeUserId,
      intendedUse:this.RecipeIntentedUse,
      coffeeId:this.RecipeCoffeeId,
      grindLevel:this.RecipeGrindLevel,
      waterAmount:this.RecipeWaterAmount,
      waterTemperature:this.RecipeWaterTemperature,
      coffeeAmount:this.RecipeCoffeeAmount
    };
    this.service.updateRecipe(val).subscribe(()=>{
      alert("Successfully updated");
    }, error => {
      this.errorMessage = error.errors;
      this.showError = true;
      console.log(this.errorMessage)
    }
    );
  }
  getCoffeesList(){
    this.service.getCoffees().subscribe(data => {
      this.CoffeeList = data;
      this.formatArray();
    })
  }
}
