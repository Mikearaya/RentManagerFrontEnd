import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarListComponent } from './car-list/car-list.component';
import { CarFormComponent } from './car-form/car-form.component';

const routes: Routes = [
  {path: 'vehicles', component: CarListComponent, data : {title: 'Vehicles List'} },
  {path: 'manage/vehicle/:vehicleId', component: CarFormComponent, data : {title: 'Update Vehicle'}},
  {path: 'manage/vehicle', component: CarFormComponent, data : {title: 'Add New Vehicle'}},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarRoutingModule { }
