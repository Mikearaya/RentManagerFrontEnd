import { CarModule } from './../car/car.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner-routing.module';
import { OwnerFormComponent } from './owner-form/owner-form.component';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatCardModule, MatInputModule,
   MatIconModule, MatSelectModule, MatButtonModule, MatProgressSpinnerModule, MatCheckboxModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { OwnerService } from './owner.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    HttpClientModule,
    MatFormFieldModule,
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    OwnerRoutingModule
  ],
  declarations: [OwnerFormComponent, OwnerListComponent],
  exports: [OwnerFormComponent, OwnerListComponent],
  providers: [OwnerService]
})
export class OwnerModule { }
