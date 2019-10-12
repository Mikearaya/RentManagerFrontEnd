import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnersPaymentRoutingModule } from './partners-payment-routing.module';
import { PartnersPaymentViewComponent } from './partners-payment-view/partners-payment-view.component';
import { PartnersPaymentFormComponent } from './partners-payment-form/partners-payment-form.component';

@NgModule({
  imports: [CommonModule, PartnersPaymentRoutingModule],
  declarations: [PartnersPaymentViewComponent, PartnersPaymentFormComponent]
})
export class PartnersPaymentModule {}
