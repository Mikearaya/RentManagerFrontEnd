
import { NgModule } from '@angular/core';
import { MatButtonModule, MatInputModule, MatFormFieldModule, MatTableModule,
   MatPaginatorModule, MatSortModule, MatSelectModule, MatCheckboxModule, MatProgressSpinnerModule,
   MatSlideToggleModule } from '@angular/material';

import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerService } from './customer.service';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
              SharedModule,
              CustomerRoutingModule ],
  declarations: [CustomerFormComponent, CustomerViewComponent],
  exports: [CustomerFormComponent, CustomerViewComponent],
  providers: [CustomerService]
})
export class CustomerModule { }
