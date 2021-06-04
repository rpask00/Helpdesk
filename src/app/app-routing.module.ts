import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CasesFormComponent } from './cases/cases-form/cases-form.component';
import { CasesListComponent } from './cases/cases-list/cases-list.component';
import { IsloggedoutGuard } from './guards/isloggedout.guard';
import { LoginPanelComponent } from './login-panel/login-panel.component';

const routes: Routes = [

  {
    path: '',
    pathMatch: "full",
    redirectTo: 'cases/list'
  },
  {
    path: "case/new",
    component: CasesFormComponent
  },
  {
    path: "login",
    component: LoginPanelComponent,
    canActivate: [IsloggedoutGuard],
  },
  {
    path: "cases/list",
    component: CasesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
