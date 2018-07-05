import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCardModule, MatTableModule,
  MatPaginatorModule, MatSortModule, MatSelectModule, MatCheckboxModule, MatProgressSpinnerModule } from '@angular/material';
import { EmployeeViewComponent } from './employee-view/employee-view.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    EmployeeRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  declarations: [EmployeeFormComponent, EmployeeViewComponent]
})
export class EmployeeModule { }
