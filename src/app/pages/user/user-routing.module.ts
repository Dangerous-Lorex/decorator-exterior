import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAppointmentComponent } from './appointment/appointment.component';
import { UserCompanyComponent } from './company/company.component';
import { UserCompanyDetailComponent } from './companyDetail/company-detail.component';
import { UserMaintenanceComponent } from './maintenance/maintenance.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'company', component: UserCompanyComponent },
      { path: 'company/:id', component: UserCompanyDetailComponent },
      { path: 'appointment', component: UserAppointmentComponent },
      { path: 'maintenance', component: UserMaintenanceComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
