import { CustomerViewModel, CustomerView } from './../../customer/customer-view/customer-view-datasource';

import { RentConditionFormComponent } from './../rent-condition-form/rent-condition-form.component';
import { CarService, Car } from './../../car/car.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RentDetailFormComponent } from '../rent-detail-form/rent-detail-form.component';
import { RentService, Rent } from '../rent.service';
import { CustomerService, Customer } from '../../customer/customer.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-rent-form',
  templateUrl: './rent-form.component.html',
  styleUrls: ['./rent-form.component.css']
})
export class RentFormComponent implements OnInit, AfterViewInit {
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
  CARS: Car[];
  CUSTOMERS: Customer[];
  selectedCar: number;
  selectedCustomer: number;
  private currentVehicleId: number;
  private rent: Rent;
     currentRentId: number;
  private currentCustomerId: number;


  constructor(private rentService: RentService,
              private formBuilder: FormBuilder,
              private carService: CarService,
              private customerService: CustomerService,
              private activatedRoute: ActivatedRoute) {
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
        }
  ngAfterViewInit() {
    this.vehicleConditionForm = this.conditionComponent.form;
    this.rentDetailForm = this.rentDetailComponent.form;

  }
  displayCustomerWith(customer?: Customer): string | undefined {
    console.log(customer);
    return customer ? `${customer.first_name} ${customer.last_name}` : undefined;
  }

  displayVehicleWith(customer?: Car): string | undefined {
    console.log(customer);
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
      vehicle: this.buildControl(currentRent.VEHICLE_ID, true),
      customer: this.buildControl(currentRent.CUSTOMER_ID, true),
      customerForm: ''
    });

  }

  private prepateDataModel(form: FormGroup): Rent {
    const currentForm = this.rentForm.value;
    const conditionDataModel = this.conditionComponent.prepareDataModel();
    const detailDataModel = this.rentDetailComponent.prepareDataModel();
    detailDataModel.RENT_ID = null;
    detailDataModel.VEHICLE_ID = (this.currentVehicleId) ? this.currentVehicleId :  currentForm.vehicle.VEHICLE_ID;
    detailDataModel.CUSTOMER_ID = (this.currentCustomerId) ? this.currentCustomerId :  currentForm.customer.CUSTOMER_ID;
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
      console.log(result);
      this.currentRentId = result;
    } else {
      alert('failed');
    }
  }


}
