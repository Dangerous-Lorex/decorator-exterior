import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppointmentComponent } from './appointment/appointment.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'appointment', component: AppointmentComponent },
      { path: 'maintenance', component: MaintenanceComponent },
      { path: 'statistics', component: StatisticsComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DecoratorRoutingModule {}
