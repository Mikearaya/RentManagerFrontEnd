import { NgModule } from '@angular/core';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { PaymentViewComponent } from './payment-view/payment-view.component';

import { PaymentApiService } from './payment-api.service';

import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    PaymentRoutingModule,

  ],
  declarations: [PaymentFormComponent, PaymentViewComponent],
  exports: [PaymentViewComponent],
  providers: [PaymentApiService],
  entryComponents: [PaymentFormComponent]
})
export class PaymentModule { }
