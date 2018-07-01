import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
                          {path: 'manage/employee', component: EmployeeFormComponent, data: {title: 'Add New Employee'}},
                          { path: 'manage/employee/:employeeId', component: EmployeeFormComponent, data: {title: 'Update Employee'}}
                        ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
