import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoffeeComponent } from './coffee/coffee.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { RecipeComponent } from './recipe/recipe.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  {path:'coffees', component: CoffeeComponent},
  {path:'recipes', component: RecipeComponent, canActivate: [AuthGuard]},
  {path:'manufacturers', component: ManufacturerComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: '', redirectTo: '/manufacturers', pathMatch: 'full' },
  { path: '**', redirectTo: '/manufacturers', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
