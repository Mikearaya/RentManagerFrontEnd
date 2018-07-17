import { PaymentFormComponent } from './payment-form/payment-form.component';
import { PaymentViewComponent } from './payment-view/payment-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
                          {path: 'payments', component: PaymentViewComponent, data: {selfContained: true, title: 'All Payments'}},
                          {path: 'add/payment', component: PaymentFormComponent, data: {selfContained: true, title: 'Add Payment'}},
                        ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
