import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner-routing.module';
import { OwnerFormComponent } from './owner-form/owner-form.component';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatCardModule, MatInputModule,
   MatIconModule, MatSelectModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    OwnerRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule
  ],
  declarations: [OwnerFormComponent, OwnerListComponent]
})
export class OwnerModule { }
