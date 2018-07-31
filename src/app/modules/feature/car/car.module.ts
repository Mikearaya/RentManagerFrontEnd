import { SharedModule } from './../../shared/shared.module';
import { CarService } from './car.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarRoutingModule } from './car-routing.module';
import { CarFormComponent } from './car-form/car-form.component';
import { MatTableModule, MatSortModule, MatPaginatorModule, MatCardModule, MatFormFieldModule, MatInputModule,
  MatSelectModule, MatIconModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule,
  MatProgressSpinnerModule, MatButtonToggleModule,
  MatAutocompleteModule} from '@angular/material';
import { CarListComponent } from './car-list/car-list.component';


@NgModule({
  imports: [ SharedModule,
              CarRoutingModule,


  ],
  declarations: [CarFormComponent, CarListComponent],
  exports: [CarFormComponent, CarListComponent],
  providers: [CarService]
})
export class CarModule { }
