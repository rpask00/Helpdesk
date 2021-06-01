import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplicationsListComponent } from './applications-list/applications-list.component';
import { LoginComponent } from './login/login.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllMaterialModule } from './all-material.module';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationsListComponent,
    LoginComponent,
    ApplicationFormComponent
  ],
  imports: [
    AllMaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
