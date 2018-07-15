import { RentDetailViewComponent } from './rent-detail-view/rent-detail-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RentViewComponent } from './rent-view/rent-view.component';
import { RentFormComponent } from './rent-form/rent-form.component';
import { RentContratComponent } from './rent-contrat/rent-contrat.component';

const routes: Routes = [
                    {path: 'rents',
                          component: RentViewComponent,
                          data: { title: 'Rents', selfContained: true}
                        },
                    {path: 'rent/vehicle',
                          component: RentFormComponent,
                          data: { title: 'New Rent Form', selfContained: true}
                        },
                    {path: 'rent/vehicle/:vehicleId',
                        component: RentFormComponent,
                        data: { title: 'Update Rent Details', selfContained: true}
                      },
                    {path: 'rent/contrat/:rentId',
                        component: RentContratComponent,
                        data: { title: 'New Rent Contrat', selfContained: true}
                      },
                      {path: 'rent/detail/:rentId',
                      component: RentDetailViewComponent,
                      data: { title: 'Rent Detail', selfContained: true}
                    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentRoutingModule { }
