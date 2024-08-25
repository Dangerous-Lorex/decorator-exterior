import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewUserComponent } from './viewUser/view-user.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'user-list', component: ViewUserComponent },
      { path: 'decorator-list', component: ViewUserComponent },
      { path: 'company-list', component: ViewUserComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
