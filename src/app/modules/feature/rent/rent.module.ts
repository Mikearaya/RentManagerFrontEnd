
import { CarModule } from './../car/car.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentRoutingModule } from './rent-routing.module';
import { RentFormComponent } from './rent-form/rent-form.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatFormFieldModule, MatStepperModule,
          MatIconModule, MatDatepickerModule, MatSelectModule, MatCardModule, MatButtonModule,
           MatProgressSpinnerModule, MatCheckboxModule, MatAutocompleteModule, MatListModule
        } from '@angular/material';
import { RentViewComponent } from './rent-view/rent-view.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RentService } from './rent.service';
import { RentConditionFormComponent } from './rent-condition-form/rent-condition-form.component';
import { RentDetailFormComponent } from './rent-detail-form/rent-detail-form.component';
import { RentContratComponent } from './rent-contrat/rent-contrat.component';
import { CustomDatePickerModule } from '../../shared/custom-date-picker/custom-date-picker.module';
import { CustomerModule } from '../customer/customer.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { OWL_DATE_TIME_FORMATS} from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';
import { RentDetailViewComponent } from './rent-detail-view/rent-detail-view.component';
import { RentExtensionFormComponent } from './rent-extension-form/rent-extension-form.component';

export const MY_MOMENT_FORMATS = {
  parseInput: 'YYYY-MM-DD',
  fullPickerInput: 'YYYY-MM-DD hh:mm',
  datePickerInput: 'YYYY-MM-DD',
  timePickerInput: 'hh:mm',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};
@NgModule({
  imports: [
    CommonModule,
    RentRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatStepperModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    CustomDatePickerModule,
    MatButtonModule,
    MatDatepickerModule,
    HttpClientModule,
    MatSelectModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatCardModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    OwlDateTimeModule, OwlMomentDateTimeModule,
    CarModule,
    CustomerModule
  ],
  declarations: [ RentFormComponent, RentViewComponent,
                  RentConditionFormComponent, RentDetailFormComponent,
                  RentContratComponent,
                  RentDetailViewComponent,
                  RentExtensionFormComponent],
  exports: [  RentFormComponent,
              RentViewComponent,
              RentConditionFormComponent,
              RentDetailFormComponent,
              RentDetailViewComponent,
              RentContratComponent,
              RentExtensionFormComponent
            ],
  providers: [RentService,
    {provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS},
]
})
export class RentModule { }
