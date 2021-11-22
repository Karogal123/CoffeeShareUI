import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoffeeComponent } from './coffee/coffee.component';
import { LoginComponent } from './login/login.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'coffees', component: CoffeeComponent},
  {path:'recipes', component: RecipeComponent},
  {path:'manufacturers', component: ManufacturerComponent },
  {path:'', redirectTo: '/recipes', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
