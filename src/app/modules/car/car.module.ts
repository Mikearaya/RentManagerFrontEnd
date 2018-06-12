import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarRoutingModule } from './car-routing.module';
import { CarFormComponent } from './car-form/car-form.component';
import { MatTableModule, MatSortModule, MatPaginatorModule } from '@angular/material';
import { CarListComponent } from './car-list/car-list.component';

@NgModule({
  imports: [
    CommonModule,
    CarRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  declarations: [CarFormComponent, CarListComponent],
  exports: []
})
export class CarModule { }
