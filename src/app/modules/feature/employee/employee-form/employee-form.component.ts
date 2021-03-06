import { MatSnackBar, MatSnackBarDismiss } from '@angular/material';

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, EmployeeApiService } from '../employee-api.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  @Input('employee') employee: Employee;
  form: FormGroup;
  isUpdate: Boolean = false;
  employeeId: number;
  title: string;
  private selfContained: Boolean = false;
  errorMessages: string[];


  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private employeeApiService: EmployeeApiService,
              private router: Router,
              private snackBar: MatSnackBar) {
              this.generateForm();

            }

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.data['title'];
    this.selfContained = this.activatedRoute.snapshot.data['selfContained'];
    this.employeeId = + this.activatedRoute.snapshot.paramMap.get('employeeId');
    if (this.employeeId) {
      this.isUpdate = true;
      this.employeeApiService.getEmployeeById(this.employeeId).subscribe((employee: Employee) => this.generateForm(employee));
    }
   }

  get employeeForm() { return this.form; }

  isSelfContained(): Boolean {
    return this.selfContained;
  }
  private generateForm(currentEmployee: any | Employee = '') {
    this.employee = (currentEmployee) ? (<Employee>currentEmployee) : null;
    this.form = this.formBuilder.group({
      firstName: this.buildControl(currentEmployee.first_name, true),
      lastName: this.buildControl(currentEmployee.last_name, true),
      wereda: this.buildControl(currentEmployee.wereda, true),
      subCity: this.buildControl(currentEmployee.sub_city, true),
      country: this.buildControl(currentEmployee.country, true),
      city: this.buildControl(currentEmployee.city, true),
      houseNumber: this.buildControl(currentEmployee.house_number, true),
      phoneNumber: this.buildControl(currentEmployee.phone_number, true)
    });
}

prepareDataModel(form: FormGroup): Employee {
  const formModel = form.value;
  const  dataModel: Employee =  {
        EMPLOYEE_ID: (this.employeeId) ? this.employeeId : 0 ,
        first_name: formModel.firstName,
        last_name: formModel.lastName,
        house_number: formModel.houseNumber,
        sub_city: formModel.subCity,
        country: formModel.country,
        city: formModel.city,
        phone_number: formModel.phoneNumber,
        wereda: formModel.wereda
    };
  return dataModel;
}

  private buildControl(value = '', required = false) {
    return (required) ? [value , Validators.required] : value;
  }

onSubmit() {
  this.employee = this.prepareDataModel(this.form);
  if (this.isUpdate) {
    this.employeeApiService.updateEmployee(this.employee)
                                            .subscribe((success: Employee) => this.handelSuccess(success),
                                                        (error: HttpErrorResponse) => this.handelError(error));
  } else {
    this.employeeApiService.addEmployee(this.employee)
                                          .subscribe((success: Employee) => this.handelSuccess(success),
                                                      (error: HttpErrorResponse) => this.handelError(error));
  }
  }


  handelSuccess(result: Employee) {
    this.errorMessages = [];
    const snackBar = this.snackBar.open('Employee Information Saved Successfully');
    snackBar.afterDismissed().subscribe((snack: MatSnackBarDismiss) => {
        this.router.navigate(['employees']);
    });
}


handelError(error: HttpErrorResponse) {
  this.errorMessages = error.error;
  this.snackBar.open('Error Occured While Saving Client Information');
}

}
