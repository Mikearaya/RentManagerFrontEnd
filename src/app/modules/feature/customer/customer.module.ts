import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatInputModule, MatFormFieldModule, MatTableModule,
   MatPaginatorModule, MatSortModule, MatSelectModule, MatCheckboxModule, MatProgressSpinnerModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerService } from './customer.service';
import { CustomerViewComponent } from './customer-view/customer-view.component';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    CustomerRoutingModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule
  ],
  declarations: [CustomerFormComponent, CustomerViewComponent],
  exports: [CustomerFormComponent, CustomerViewComponent],
  providers: [CustomerService]
})
export class CustomerModule { }
