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
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header/header.component';
import { RegisterComponent } from './register/register.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { AddEditCoffeeComponent } from './coffee/add-edit-coffee/add-edit-coffee.component'

@NgModule({
  declarations: [
    AppComponent,
    TagsComponent,
    CoffeeComponent,
    RecipeComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    ManufacturerComponent,
    AddEditCoffeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    NgbModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
