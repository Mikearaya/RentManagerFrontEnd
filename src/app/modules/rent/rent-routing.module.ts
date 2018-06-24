import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RentViewComponent } from './rent-view/rent-view.component';
import { RentFormComponent } from './rent-form/rent-form.component';
import { RentContratComponent } from './rent-contrat/rent-contrat.component';

const routes: Routes = [
  {path: 'rents', component: RentViewComponent, data: { title: 'Rents'}},
  {path: 'rent/vehicle', component: RentFormComponent, data: { title: 'New Rent Form'}},
  {path: 'rent/vehicle/:vehicleId', component: RentFormComponent, data: { title: 'Update Rent Details'} },
  {path: 'rent/contrat/:rentId', component: RentContratComponent, data: { title: 'New Rent Contrat'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentRoutingModule { }
