import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    RouterModule,
    SharedModule
  ],
  declarations: [NavigationComponent, DashboardComponent],
  exports: [NavigationComponent, DashboardComponent]
})
export class CoreModule { }
