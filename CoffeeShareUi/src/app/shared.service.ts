import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';    
import {Observable} from 'rxjs';    

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly ApiUrl = "https://localhost:44331"
  constructor(private http: HttpClient) { }

  getCoffees() : Observable<any[]> {
    return this.http.get<any>(this.ApiUrl + '/Coffee');
  }
  getCoffeeById(val:any){
    return this.http.get<any>(this.ApiUrl + '/Coffees/', val);
  }
  createCoffee(val:any) {
    return this.http.post(this.ApiUrl + '/Coffees', val);
  }
  deleteCoffee(val:any){
    return this.http.delete(this.ApiUrl + '/Coffees/', val);
  }
  updateCoffee(val:any){
    return this.http.put(`${this.ApiUrl}/Coffees/${val.id}`, val);
  }
  //----Countries
  getCountries() : Observable<any[]> {
    return this.http.get<any>(this.ApiUrl + '/Countries')
  }
  //----Comments
  getCommentsForRecipe(val:any){
    return this.http.get<any>(this.ApiUrl + '/Comments/', val);
  }
  createComment(val:any){
    return this.http.post(this.ApiUrl + '/Comments', val);
  }
  deleteComment(val:any){
    return this.http.delete(this.ApiUrl + '/Comments/', val);
  }
  //----Manufacturers
  getManufacturers() : Observable<any[]> {
    return this.http.get<any>(this.ApiUrl + '/Manufacturers')
  }
  getManufacturerById(val:any){
    return this.http.get<any>(this.ApiUrl + '/Manufacturers/', val);
  }
  createManufacturer(val:any) {
    return this.http.post(this.ApiUrl + '/Manufacturers', val);
  }
  deleteManufacturer(val:any){
    return this.http.delete(this.ApiUrl + '/Manufacturers/', val);
  }
  updateManufactutrer(val:any){
    return this.http.put(`${this.ApiUrl}/Manufacturers/${val.id}`, val);
  }
  //----Recipes
  getRecipes() : Observable<any[]> {
    return this.http.get<any>(this.ApiUrl + '/Recipes')
  }
  getRecipeById(val:any){
    return this.http.get<any>(this.ApiUrl + '/Recipes/', val);
  }
  createRecipe(val:any) {
    return this.http.post(this.ApiUrl + '/Recipes', val);
  }
  deleteRecipe(val:any){
    return this.http.delete(this.ApiUrl + '/Recipes/', val);
  }
  updateRecipe(val:any){
    return this.http.put(`${this.ApiUrl}/Recipes/${val.id}`, val);
  }
  //----RecipesScore
  getRecipesScoresForRecipe(val: any){
    return this.http.get<any>(this.ApiUrl + '/RecipesScores', val)
  }
  createRecipeScore(val:any){
    return this.http.post(this.ApiUrl + '/RecipesScores/', val);
  }
  updateRecipeScore(val:any){
    return this.http.put(`${this.ApiUrl}/RecipesScores/${val.id}`, val);
  }
  //----RecipesScore
  LogIn(email:any, password:any){
    return this.http.post(this.ApiUrl + '/users/Login', email, password);
  }
  Register(email:any, password:any){
    return this.http.post(this.ApiUrl + '/users/Register', email, password);
  }
}

