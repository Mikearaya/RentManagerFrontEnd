import { MatDialogModule } from '@angular/material/dialog';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDatePickerModule } from './custom-date-picker/custom-date-picker.module';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatDividerModule, MatSidenavModule,
          MatIconModule, MatListModule, MatGridListModule, MatMenuModule,
          MatExpansionModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule,
          MatCheckboxModule, MatTableModule, MatProgressSpinnerModule, MatPaginatorModule,
          MatSortModule, MatSlideToggleModule, MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule, MatButtonToggleModule
        } from '@angular/material';
import { FormOptionsComponent } from './form-options/form-options.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
  ],
  declarations: [FormOptionsComponent],
  exports: [  CommonModule,
              ReactiveFormsModule,
              LayoutModule,
              BrowserAnimationsModule,

              CustomDatePickerModule,
              FormOptionsComponent,

              MatTableModule,
              MatDialogModule,
              MatSortModule,
              MatCardModule,
              MatAutocompleteModule,
              MatFormFieldModule,
              ReactiveFormsModule,
              HttpClientModule,
              MatInputModule,
              MatCheckboxModule,
              MatSelectModule,
              MatIconModule,
              MatButtonModule,
              MatPaginatorModule,
              MatDatepickerModule,
              MatNativeDateModule,
              MatButtonToggleModule,
              MatProgressSpinnerModule,
              MatToolbarModule,
              MatDividerModule,
              MatSidenavModule,
              MatListModule,
              MatGridListModule,
              MatMenuModule,
              MatExpansionModule,
              MatSlideToggleModule,
            ]
})
export class SharedModule { }
