import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { LoginPanelComponent } from './login-panel/login-panel.component';

const routes: Routes = [
  {
    path: "application/new",
    component: ApplicationFormComponent
  },
  {
    path: "login",
    component: LoginPanelComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
