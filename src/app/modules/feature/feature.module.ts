import { EmployeeModule } from './employee/employee.module';
import { OwnerModule } from './owner/owner.module';
import { CarModule } from './car/car.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentModule } from './rent/rent.module';
import { CustomerModule } from './customer/customer.module';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [CarModule, RentModule, CustomerModule, OwnerModule, EmployeeModule],
  declarations: []
})
export class FeatureModule { }
