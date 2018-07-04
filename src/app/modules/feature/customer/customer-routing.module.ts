
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';

const routes: Routes = [
                        {path: 'customers', component: CustomerViewComponent, data: {title: 'Customers List', selfContained: true}},
                        {path: 'add/customer', component: CustomerFormComponent, data: {title: 'Add New Customer', selfContained: true}},
                        {path: 'update/customer/:customerId',
                        component: CustomerFormComponent, data: {title: 'Update Customer', selfContained: true}
                      }
                      ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
