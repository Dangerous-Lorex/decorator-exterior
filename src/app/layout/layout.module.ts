import { NgModule } from '@angular/core';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LayoutRoutingModule } from './layout-routing.module';

@NgModule({
  imports: [LayoutRoutingModule],
  providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class LayoutModule { }
