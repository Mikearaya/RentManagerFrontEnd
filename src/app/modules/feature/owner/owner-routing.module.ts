import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { OwnerFormComponent } from './owner-form/owner-form.component';

const routes: Routes = [
                        {path: 'owners',
                           component : OwnerListComponent,
                          data: {title: 'Vehicle Owners List', selfContained: true }
                        },
                        {path: 'add/owner',
                          component: OwnerFormComponent,
                          data: {title: 'Add New Owner', selfContained: true }
                        },
                        {path: 'update/owner/:id',
                            component: OwnerFormComponent,
                            data: {title: 'Update Owner', selfContained: true } }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
