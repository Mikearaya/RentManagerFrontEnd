import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { PaymentViewComponent } from './payment-view/payment-view.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule,
  MatInputModule, MatSelectModule, MatIconModule, MatFormFieldModule } from '@angular/material';
import { PaymentApiService } from './payment-api.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    PaymentRoutingModule

  ],
  declarations: [PaymentFormComponent, PaymentViewComponent],
  providers: [PaymentApiService]
})
export class PaymentModule { }
