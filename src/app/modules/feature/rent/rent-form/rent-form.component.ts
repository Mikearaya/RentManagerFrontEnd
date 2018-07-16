import { MatSnackBar } from '@angular/material';
import { Customer } from './../../customer/customer.service';
import { EmployeeApiService } from './../../employee/employee-api.service';


import { RentConditionFormComponent } from './../rent-condition-form/rent-condition-form.component';
import { CarService, Car } from './../../car/car.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Component, OnInit, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';
import { RentDetailFormComponent } from '../rent-detail-form/rent-detail-form.component';
import { RentService, Rent } from '../rent.service';
import { CustomerService } from '../../customer/customer.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../../employee/employee-api.service';
import { startWith, map } from 'rxjs/operators';


function customerValidator(value: AbstractControl): {[key: string]: boolean} | null {
  if ( value.value instanceof Object) {
      return null;
  } else {
    return { 'validCustomer' : true };
  }
}

function vehicleValidator(value: AbstractControl): {[key: string]: boolean} | null {
  if ( value.value instanceof Object) {
      return null;
  } else {
    return { 'validVehicle' : true };
  }
}

function employeeValidator(value: AbstractControl): {[key: string]: boolean} | null {
  if ( value.value instanceof Object) {
      return null;
  } else {
    return { 'validEmployee' : true };
  }
}


@Component({
  selector: 'app-rent-form',
  templateUrl: './rent-form.component.html',
  styleUrls: ['./rent-form.component.css']
})
export class RentFormComponent implements OnInit, AfterContentInit {
   @ViewChild(RentConditionFormComponent) conditionComponent: RentConditionFormComponent;
   @ViewChild(RentDetailFormComponent) rentDetailComponent: RentDetailFormComponent;
    routeData: Object;
    title: string;
    errorMessages: any;
    rentForm: FormGroup;
  customerForm: FormGroup;
  isUpdate: Boolean = false;
  rentDetailForm: FormGroup;
  vehicleConditionForm: FormGroup;
  CARS: Car[] = [];
  private CUSTOMERS: Customer[] = [];
  filteredCustomers$: Observable<Customer[]>;
  filteredEmployees$: Observable<Employee[]>;
  filteredVehicles$: Observable<Car[]>;
  EMPLOYEES: Employee[] = [];
  selectedCar: number;
  selectedCustomer: number;
  private currentVehicleId: number;
  private rent: Rent;
     currentRentId: number;
  private currentCustomerId: number;
  customer = new FormControl();
  employee = new FormControl();
  vehicle = new FormControl();


  constructor(private rentService: RentService,
              private formBuilder: FormBuilder,
              private carService: CarService,
              private employeeApiService: EmployeeApiService,
              private customerService: CustomerService,
              private activatedRoute: ActivatedRoute,
            private snackBar: MatSnackBar) {
                this.generateForm();
              }

  ngOnInit() {
    this.currentVehicleId = + this.activatedRoute.snapshot.paramMap.get('vehicleId');
    this.currentRentId = + this.activatedRoute.snapshot.paramMap.get('rentId');
    this.currentCustomerId = + this.activatedRoute.snapshot.paramMap.get('customerId');
    this.routeData = this.activatedRoute.snapshot.data;
    this.title = this.activatedRoute.snapshot.data['title'];

      if (this.currentVehicleId) {
        this.selectedCar = this.currentVehicleId;
      }
      if ( this.currentRentId) {
        this.isUpdate = true;
      }
      if (this.currentCustomerId) {
        this.selectedCustomer = this.currentVehicleId;
      }
      this.customerService.getAllCustomers().subscribe((result: any) => this.CUSTOMERS = result.customers );
      this.carService.getAvailableVehicles().subscribe((cars: Car[]) => this.CARS = cars );
      this.employeeApiService.getAllEmployees().subscribe((employees: Employee[]) => this.EMPLOYEES = employees);
      this.filteredCustomers$ = this.rentForm.get('customer').valueChanges.pipe(
        startWith(''),
        map((value) => this._filterCustomer(value))
      );

      this.filteredEmployees$ = this.rentForm.get('employee').valueChanges.pipe(
        startWith(''),
        map(value => this._filterEmployee(value))
      );
      this.filteredVehicles$ = this.rentForm.get('vehicle').valueChanges.pipe(
        startWith(''),
        map(value => this._filterVehicle(value))
      );

}
  ngAfterContentInit() {
    this.rentForm.controls.rentDetail = this.rentDetailComponent.form;
    this.rentForm.controls.vehicleCondition = this.conditionComponent.form;

    this.conditionComponent.form.valueChanges.subscribe((form) => {
      this.rentForm.controls.vehicleCondition = this.conditionComponent.form;
      this.rentForm.updateValueAndValidity();
  });
    this.rentDetailComponent.form.valueChanges.subscribe((form: FormGroup) => {
      this.rentForm.controls.rentDetail = this.rentDetailComponent.form;
      this.rentForm.updateValueAndValidity();

    });

  }

  private _filterCustomer(value): Customer[] {
    if (value instanceof Object) {
      return [];
    }
    const filterValue = value.toLowerCase();
    return this.CUSTOMERS.filter((customer: Customer) => customer.first_name.toLowerCase().includes(filterValue));
  }


  private _filterVehicle(value): Car[] {
    if (value instanceof Object) {
      return [];
    }
    const filterValue = value.toLowerCase();
    return this.CARS.filter((car: Car) => car.plate_number.toLowerCase().includes(filterValue));
  }

  private _filterEmployee(value): Employee[] {
    if (value instanceof Object) {
      return [];
    }
    const filterValue = value.toLowerCase();
    return this.EMPLOYEES.filter((employee: Employee) => employee.first_name.toLowerCase().includes(filterValue));
  }

  displayCustomerWith(customer?: Customer): string | undefined {
    return customer ? `${customer.first_name} ${customer.last_name}` : undefined;
  }

  displayEmployeeWith(employee?: Employee): string | undefined {
    return employee ? `${employee.first_name} ${employee.last_name}` : undefined;
  }

  displayVehicleWith(customer?: Car): string | undefined {
    return customer ? `${customer.plate_code} - ${customer.plate_number}` : undefined;
  }

  hasCustomerId() {
    return this.currentCustomerId;
  }
  hasVehicleId() {
    return this.currentVehicleId;
  }
  private generateForm(currentRent: any = '') {
    this.rent = (currentRent) ? (<Rent>currentRent) : null;
    this.rentForm = this.formBuilder.group({
      rentDetail: this.formBuilder.group({}, Validators.required),
      vehicleCondition: this.formBuilder.group({}, Validators.required),
      vehicle: ['', [Validators.required, vehicleValidator]],
      customer: ['', [Validators.required, customerValidator]],
      employee:  ['', [Validators.required, employeeValidator]],
    });

  }

  private prepateDataModel(form: FormGroup): Rent {
    const currentForm = this.rentForm.value;
    const conditionDataModel = this.conditionComponent.prepareDataModel();
    const detailDataModel = this.rentDetailComponent.prepareDataModel();
    detailDataModel.RENT_ID = null;
    detailDataModel.VEHICLE_ID = (this.currentVehicleId) ? this.currentVehicleId :  currentForm.vehicle.VEHICLE_ID;
    detailDataModel.CUSTOMER_ID = (this.currentCustomerId) ? this.currentCustomerId :  currentForm.customer.CUSTOMER_ID;
    detailDataModel.RENTED_BY = currentForm.employee.EMPLOYEE_ID;
    detailDataModel.condition = conditionDataModel;

    return detailDataModel;
  }

  private buildControl(value = '', required = false) {
    return (required) ? [value , Validators.required] : value;
  }
  onSubmit() {
    this.rent = this.prepateDataModel(this.rentForm);
    if (this.isUpdate) {
      this.rentService.updateRent(this.rent).subscribe(
        (result) => this.handelResponse(result),
      (error) => this.errorMessages = error);
    } else {
      this.rentService.saveRent(this.rent).subscribe((result) => this.handelResponse(result),
      (error: HttpErrorResponse) => this.errorMessages = error.error);
    }
  }

  handelResponse(result: any) {
    if (result) {
     this.snackBar.open('Rent Added Successfully');
      this.currentRentId = result;
    } else {
      this.snackBar.open('Error Occured while saving rent try Again');
    }
  }


}
