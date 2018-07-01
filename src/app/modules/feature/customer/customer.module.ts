import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerService } from './customer.service';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    CustomerRoutingModule
  ],
  declarations: [CustomerFormComponent],
  exports: [CustomerFormComponent],
  providers: [CustomerService]
})
export class CustomerModule { }
