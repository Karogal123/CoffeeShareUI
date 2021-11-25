import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoffeeComponent } from './coffee/coffee.component';
import { TagsComponent } from './tags/tags.component';
import { RecipeComponent } from './recipe/recipe.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header/header.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { AddEditCoffeeComponent } from './coffee/add-edit-coffee/add-edit-coffee.component';
import { AddEditManufacturerComponent } from './manufacturer/add-edit-manufacturer/add-edit-manufacturer.component';
import { AddEditRecipeComponent } from './recipe/add-edit-recipe/add-edit-recipe.component'
import { JwtModule } from '@auth0/angular-jwt';
import { PrivacyComponent } from './privacy/privacy.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    TagsComponent,
    CoffeeComponent,
    RecipeComponent,
    HeaderComponent,
    ManufacturerComponent,
    AddEditCoffeeComponent,
    AddEditManufacturerComponent,
    AddEditRecipeComponent,
    PrivacyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    NgbModalModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:5001"],
        blacklistedRoutes: []
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
