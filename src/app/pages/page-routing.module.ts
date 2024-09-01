import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { DecoratorProfileComponent } from './decoratorProfile/decorator-profile.component';

const routes: Routes = [
  {
    path: '',
    children: [
      // { path: '', redirectTo: '', pathMatch: 'full' },
      { path: '', component: LandingComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'decorator-profile', component: DecoratorProfileComponent },
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: "user",
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule)
  },
  {
    path: "decorator",
    loadChildren: () => import('./decorator/decorator.module').then((m) => m.DecoratorModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
