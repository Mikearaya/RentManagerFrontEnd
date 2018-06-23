// Custom DateAdapter

import {NgModule} from '@angular/core';
import {MatDatepickerModule, NativeDateModule, NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS} from '@angular/material';

// extend NativeDateAdapter's format method to specify the date format.
export class CustomDateAdapter extends NativeDateAdapter {
   format(date: Date, displayFormat: Object): string {
      if (displayFormat === 'input') {
         const day = date.getUTCDate();
         const month = date.getUTCMonth() + 1;
         const year = date.getFullYear();
         // Return the format as per your requirement
         return `${year}-${month}-${day}`;
      } else {
         return date.toDateString();
      }
   }
   // If required extend other NativeDateAdapter methods.
}

const MY_DATE_FORMATS = {
   parse: {
      dateInput: {month: 'numberic', year: 'numeric', day: 'numeric'}
   },
   display: {
      dateInput: 'input',
      monthYearLabel: {year: 'numeric', month: 'numberic'},
      dateA11yLabel: {year: 'numeric', month: 'numberic', day: 'numeric'},
      monthYearA11yLabel: {year: 'numeric', month: 'numeric'},
   }
};

@NgModule({
   declarations: [],
   imports: [],
   exports: [MatDatepickerModule, NativeDateModule],
   providers: [
      {
         provide: DateAdapter, useClass: CustomDateAdapter
      },
      {
         provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS
      }
   ]
})

export class CustomDatePickerModule { }
