import { RmHeaderInterceptorService } from './rm-header-interceptor.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [
    RouterModule,
    SharedModule
  ],
  declarations: [NavigationComponent, DashboardComponent],
  exports: [NavigationComponent, DashboardComponent],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: RmHeaderInterceptorService, multi: true}]
})
export class CoreModule { }
