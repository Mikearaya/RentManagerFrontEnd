import { CustomerFormComponent } from './../customer-form/customer-form.component';
import { RentConditionFormComponent } from './../rent-condition-form/rent-condition-form.component';
import { CarService, Car } from './../../car/car.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RentDetailFormComponent } from '../rent-detail-form/rent-detail-form.component';
import { RentService, Rent } from '../rent.service';

@Component({
  selector: 'app-rent-form',
  templateUrl: './rent-form.component.html',
  styleUrls: ['./rent-form.component.css']
})
export class RentFormComponent implements OnInit, AfterViewInit {
   title: string;
   rentForm: FormGroup;
  customerForm: FormGroup;
   @ViewChild(RentConditionFormComponent) conditionComponent: RentConditionFormComponent;
   @ViewChild(RentDetailFormComponent) rentDetailComponent: RentDetailFormComponent;
   @ViewChild(CustomerFormComponent) customerComponent: CustomerFormComponent;

  private rent: Rent;
  rentId: number;
  rentDetailForm: FormGroup;
  vehicleConditionForm: FormGroup;
  CARS: Car[];
  selectedCar: number;
  private vehicleId: number;
   isUpdate: Boolean = false;

  constructor(private rentService: RentService,
              private formBuilder: FormBuilder,
              private carService: CarService,
              private activatedRoute: ActivatedRoute) {
                this.generateForm();

              }

  ngOnInit() {
    this.vehicleId = + this.activatedRoute.snapshot.paramMap.get('vehicleId');
    this.rentId = + this.activatedRoute.snapshot.paramMap.get('rentId');
    this.title = this.activatedRoute.snapshot.data['title'];

      if (this.vehicleId) {
        this.selectedCar = this.vehicleId;
        this.isUpdate = true;
      }
  }
  ngAfterViewInit() {
      this.vehicleConditionForm = this.conditionComponent.rentConditionForm;
      this.rentDetailForm = this.rentDetailComponent.form;
      this.customerForm = this.customerComponent.form;
  }

  private generateForm(currentRent: any = '') {
    this.rent = (currentRent) ? (<Rent>currentRent) : null;
    this.rentForm = this.formBuilder.group({
      vehicleId: this.buildControl(currentRent.vehicle, true)
    });

  }

  private prepateDataModel(form: FormGroup): Rent {
    const formModel = form.value;
    const conditionDataModel = this.conditionComponent.prepareDataModel(this.vehicleConditionForm);
    const customerDataModel = this.customerComponent.prepareDataModel(this.customerForm);
    const detailDataModel = this.rentDetailComponent.prepareDataModel(this.rentDetailForm);
    detailDataModel.RENT_ID = this.rentId;
    detailDataModel.customer = customerDataModel;
    detailDataModel.condition = conditionDataModel;

    return detailDataModel;
  }

  private buildControl(value = '', required = false) {
    return (required) ? [value , Validators.required] : value;
  }
  onSubmit() {
    this.rent = this.prepateDataModel(this.rentForm);
    if (this.isUpdate) {
      this.rentService.updateRent(this.rent).subscribe((result) => this.handelResponse(result));
    } else {
      this.rentService.saveRent(this.rent).subscribe((result) => this.handelResponse(result));
    }
  }

  handelResponse(result: any) {
    if (result) {
      console.log(result);
      this.rentId = result;
    } else {
      alert('failed');
    }
  }


}
