import { NgModule } from '@angular/core';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({ imports: [AuthRoutingModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AuthModule {}
