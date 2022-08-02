import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FormMainComponent } from './components/form-main/form-main.component';
import { FormPeopleComponent } from './components/form-main/form-people/form-people.component';
import { FormListComponent } from './components/form-main/form-list/form-list.component';
import { SharedModule } from './components/shared/shared.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormDetailsComponent } from './components/form-main/form-people/form-details/form-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';
import { PersonValidator } from './validators/async-username.validator';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormMainComponent,
    FormPeopleComponent,
    FormListComponent,
    PageNotFoundComponent,
    FormDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [ApiService, PersonValidator],
  bootstrap: [AppComponent],
})
export class AppModule {}
