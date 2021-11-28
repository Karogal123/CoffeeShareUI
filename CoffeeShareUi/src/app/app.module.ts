import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ErrorHandlerService } from './shared/error-handler.service';
import { RecipeDetailsComponent } from './recipe/recipe-details/recipe-details.component';
import { RemoveDomainFromEmailPipe } from './pipes/remove-domain-from-email.pipe';

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
    ForbiddenComponent,
    RecipeDetailsComponent,
    RemoveDomainFromEmailPipe,
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
        whitelistedDomains: ["localhost:5001", "localhost:5000"],
        blacklistedRoutes: [],
        authScheme: "Bearer "
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
