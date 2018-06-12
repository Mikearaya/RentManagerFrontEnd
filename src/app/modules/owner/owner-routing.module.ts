import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { OwnerFormComponent } from './owner-form/owner-form.component';

const routes: Routes = [
  {path: 'owners', component : OwnerListComponent },
  {path: 'manage/owner', component: OwnerFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
