import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllMaterialModule } from './all-material.module';
import { LoginPanelComponent } from './login-panel/login-panel.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CasesListComponent } from './cases/cases-list/cases-list.component';
import { CasesFormComponent } from './cases/cases-form/cases-form.component';
import { MatCheckboxDefaultOptions, MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';
import { ToastrModule } from 'ngx-toastr';
import { FilterPanelComponent } from './cases/cases-list/filter-panel/filter-panel.component';
import { CaseCommentsComponent } from './cases/case-comments/case-comments.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPanelComponent,
    CasesListComponent,
    CasesFormComponent,
    FilterPanelComponent,
    CaseCommentsComponent
  ],
  imports: [
    AllMaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    { provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: { clickAction: 'noop' } as MatCheckboxDefaultOptions }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
