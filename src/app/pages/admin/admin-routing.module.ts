import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewUserComponent } from './viewUser/view-user.component';
import { ViewDecoratorComponent } from './viewDecorator/view-decorator.component';
import { ViewCompanyComponent } from './viewCompany/view-company.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'user-list', component: ViewUserComponent },
      { path: 'decorator-list', component: ViewDecoratorComponent },
      { path: 'company-list', component: ViewCompanyComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
