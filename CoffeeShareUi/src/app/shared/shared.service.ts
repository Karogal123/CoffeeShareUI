import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';    
import {Observable} from 'rxjs';    

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly ApiUrl = "https://localhost:44331"
  constructor(private http: HttpClient) { }

  getCoffees() : Observable<any[]> {
    return this.http.get<any>(this.ApiUrl + '/Coffee', this.generateHeaders());
  }
  getCoffeeById(val:any){
    return this.http.get<any>(this.ApiUrl + '/Coffee/', val);
  }
  createCoffee(val:any) {
    return this.http.post(this.ApiUrl + '/Coffee', val, this.generateHeaders());
  }
  deleteCoffee(val:any){
    return this.http.delete(`${this.ApiUrl}/Coffee/${val.id}`, this.generateHeaders());
  }
  updateCoffee(val:any){
    return this.http.put(`${this.ApiUrl}/Coffee/${val.id}`, val, this.generateHeaders());
  }
  //----Countries
  getCountries() : Observable<any[]> {
    return this.http.get<any>(this.ApiUrl + '/Countries')
  }
  //----Comments
  getCommentsForRecipe(val:any){
    return this.http.get<any[]>(this.ApiUrl + '/Comments/', {params: {recipeId: val}});
  }
  createComment(val:any){
    return this.http.post(this.ApiUrl + '/Comments', val, this.generateHeaders());
  }
  deleteComment(val:any){
    return this.http.delete(`${this.ApiUrl}/Comments/${val.id}`, this.generateHeaders());
  }
  //----Manufacturers
  getManufacturers() : Observable<any[]> {
    return this.http.get<any>(this.ApiUrl + '/Manufacturers', this.generateHeaders())
  }
  createManufacturer(val:any) {
    return this.http.post(this.ApiUrl + '/Manufacturers', val, this.generateHeaders());
  }
  deleteManufacturer(val:any){
    return this.http.delete(`${this.ApiUrl}/Manufacturers/${val.id}`, this.generateHeaders());
  }
  updateManufactutrer(val:any){
    return this.http.put(`${this.ApiUrl}/Manufacturers/${val.id}`, val, this.generateHeaders());
  }
  //----Recipes
  getRecipes() : Observable<any[]> {
    return this.http.get<any>(this.ApiUrl + '/Recipes', this.generateHeaders())
  }
  getRecipeById(val:any){
    return this.http.get<any>(`${this.ApiUrl}/Recipes/GetById/${val}`, this.generateHeaders());
  }
  createRecipe(val:any) {
    return this.http.post(this.ApiUrl + '/Recipes', val, this.generateHeaders());
  }
  deleteRecipe(val:any){
    return this.http.delete(`${this.ApiUrl}/Recipes/${val}`, this.generateHeaders());
  }
  updateRecipe(val:any){
    return this.http.put(`${this.ApiUrl}/Recipes/${val.id}`, val, this.generateHeaders());
  }
  //----RecipesScore
  getRecipesScoresForRecipe(val: any){
    return this.http.get<any>(this.ApiUrl + '/RecipesScores', {params: {recipeId: val}})
  }
  createRecipeScore(val:any){
    return this.http.post(this.ApiUrl + '/RecipesScores', val, this.generateHeaders());
  }
  updateRecipeScore(val:any){
    return this.http.put(`${this.ApiUrl}/RecipesScores/${val.id}`, val, this.generateHeaders());
  }

  public getUserId(){
    return this.http.get<any>(this.ApiUrl + '/users/GetUserId', this.generateHeaders());
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
        }),
    };
  }; 
}

