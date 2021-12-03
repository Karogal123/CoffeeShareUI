import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoffeeComponent } from './coffee/coffee.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { RecipeDetailsComponent } from './recipe/recipe-details/recipe-details.component';
import { RecipeComponent } from './recipe/recipe.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { AuthGuard } from './shared/guards/auth.guard';
import { TagsComponent } from './tags/tags.component';

const routes: Routes = [
  {path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  {path:'coffees', component: CoffeeComponent, canActivate: [AuthGuard, AdminGuard]},
  {path:'recipes', component: RecipeComponent},
  {path: 'recipe/:id', component: RecipeDetailsComponent},
  {path:'manufacturers', component: ManufacturerComponent, canActivate: [AuthGuard, AdminGuard] },
  {path:'tags', component: TagsComponent},
  {path: 'privacy', component: PrivacyComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'forbidden', component: ForbiddenComponent },
  {path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {path: '**', redirectTo: '/404', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
