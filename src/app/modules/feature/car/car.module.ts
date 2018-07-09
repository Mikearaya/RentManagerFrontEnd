import { CarService } from './car.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarRoutingModule } from './car-routing.module';
import { CarFormComponent } from './car-form/car-form.component';
import { MatTableModule, MatSortModule, MatPaginatorModule, MatCardModule, MatFormFieldModule, MatInputModule,
  MatSelectModule, MatIconModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule,
  MatProgressSpinnerModule,
  MatAutocompleteModule} from '@angular/material';
import { CarListComponent } from './car-list/car-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VehicleSelectorComponent } from './vehicle-selector/vehicle-selector.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
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
    CarRoutingModule,
    MatProgressSpinnerModule
  ],
  declarations: [CarFormComponent, CarListComponent, VehicleSelectorComponent],
  exports: [CarFormComponent, CarListComponent, VehicleSelectorComponent],
  providers: [CarService]
})
export class CarModule { }
