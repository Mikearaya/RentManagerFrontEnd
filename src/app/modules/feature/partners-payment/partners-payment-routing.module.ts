import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartnersPaymentFormComponent } from './partners-payment-form/partners-payment-form.component';
import { PartnersPaymentViewComponent } from './partners-payment-view/partners-payment-view.component';

const routes: Routes = [
  { path: 'parnters/payments', component: PartnersPaymentViewComponent },
  { path: 'parnters/payments/add', component: PartnersPaymentFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnersPaymentRoutingModule {}
