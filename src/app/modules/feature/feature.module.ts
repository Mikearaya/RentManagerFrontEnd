import { EmployeeModule } from './employee/employee.module';
import { OwnerModule } from './owner/owner.module';
import { CarModule } from './car/car.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentModule } from './rent/rent.module';
import { CustomerModule } from './customer/customer.module';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [CarModule, RentModule, CustomerModule, OwnerModule, EmployeeModule],
  declarations: []
})
export class FeatureModule { }
