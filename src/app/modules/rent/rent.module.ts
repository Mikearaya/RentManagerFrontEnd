import { CarModule } from './../car/car.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentRoutingModule } from './rent-routing.module';
import { RentFormComponent } from './rent-form/rent-form.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatFormFieldModule, MatStepperModule,
          MatIconModule, MatNativeDateModule, MatDatepickerModule, MatSelectModule, MatCardModule, MatButtonModule,
           MatDividerModule, MatProgressSpinnerModule, MatCheckboxModule
        } from '@angular/material';
import { RentViewComponent } from './rent-view/rent-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RentService } from './rent.service';
import { RentConditionFormComponent } from './rent-condition-form/rent-condition-form.component';
import { RentDetailFormComponent } from './rent-detail-form/rent-detail-form.component';

@NgModule({
  imports: [
    CommonModule,
    RentRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatStepperModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatButtonModule,
    MatDatepickerModule,
    HttpClientModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    CarModule
  ],
  declarations: [RentFormComponent, RentViewComponent, RentConditionFormComponent, RentDetailFormComponent],
  providers: [RentService]
})
export class RentModule { }
