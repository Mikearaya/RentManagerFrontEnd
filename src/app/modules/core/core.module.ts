
import { RmHeaderInterceptorService } from './rm-header-interceptor.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    MatSnackBarModule
  ],
  declarations: [NavigationComponent, DashboardComponent],
  exports: [NavigationComponent, DashboardComponent],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: RmHeaderInterceptorService, multi: true},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
      horizontalPosition: 'right', verticalPosition: 'top', duration: 5000}}
  ]
})
export class CoreModule { }
