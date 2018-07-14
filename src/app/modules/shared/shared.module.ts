
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDatePickerModule } from './custom-date-picker/custom-date-picker.module';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatDividerModule, MatSidenavModule,
          MatIconModule, MatListModule, MatGridListModule, MatMenuModule,
          MatExpansionModule, MatCardModule
        } from '@angular/material';

@NgModule({
  imports: [

  ],
  declarations: [],
  exports: [  CommonModule,
              CustomDatePickerModule,
              LayoutModule,
              BrowserAnimationsModule,
              MatToolbarModule,
              MatButtonModule,
              MatDividerModule,
              MatSidenavModule,
              MatIconModule,
              MatListModule,
              MatGridListModule,
              MatCardModule,
              MatMenuModule,
              MatExpansionModule
            ]
})
export class SharedModule { }
