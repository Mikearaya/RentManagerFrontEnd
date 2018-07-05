import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
                          {path: 'add/employee',
                                  component: EmployeeFormComponent,
                                  data: {title: 'Add New Employee',
                                  selfContained: true}},
                          { path: 'update/employee/:employeeId',
                                    component: EmployeeFormComponent,
                                    data: {title: 'Update Employee', selfContained: true }}
                        ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
