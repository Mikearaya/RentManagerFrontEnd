import { RentConditionFormComponent } from './../rent-condition-form/rent-condition-form.component';
import { CarService, Car } from './../../car/car.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { RentService, Rent } from 'src/app/modules/rent/rent.service';
import { DateAdapter } from '@angular/material/core';
import { RentDetailFormComponent } from '../rent-detail-form/rent-detail-form.component';

@Component({
  selector: 'app-rent-form',
  templateUrl: './rent-form.component.html',
  styleUrls: ['./rent-form.component.css']
})
export class RentFormComponent implements OnInit, AfterViewInit {
   title: string;
   rentForm: FormGroup;
   @ViewChild(RentConditionFormComponent) conditionComponent: RentConditionFormComponent;
   @ViewChild(RentDetailFormComponent) rentDetailComponent: RentDetailFormComponent;

  private rent: Rent;
  private rentId: number;
  rentDetailForm: FormGroup;
  vehicleConditionForm: FormGroup;
  CARS: Car[];
  selectedCar: number;
  private vehicleId: number;
   isUpdate: Boolean = false;
   IDENTIFICATIONS = [{type: 'Driver Licence'}, {type: 'Passport'}, {type: 'Local ID'}];

  constructor(private rentService: RentService,
              private formBuilder: FormBuilder,
              private carService: CarService,
              private activatedRoute: ActivatedRoute) {
                this.generateForm();
                this.carService.getAllCars().subscribe((cars: Car[]) => this.CARS = cars);

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
  }

  private generateForm(currentRent: any = '') {
    this.rent = (currentRent) ? (<Rent>currentRent) : null;
    this.rentForm = this.formBuilder.group({
      vehicleId: this.buildControl(currentRent.vehicle, true),
      firstName: this.buildControl(currentRent.first_name, true),
      lastName: this.buildControl(currentRent.last_name, true),
      passportNumber: this.buildControl(currentRent.passport_number, true),
      drivingLicenceId: this.buildControl(currentRent.driving_licence_id, true),
      nationality: this.buildControl(currentRent.nationality, true),
      country: this.buildControl(currentRent.country, true),
      city: this.buildControl(currentRent.city, true),
      houseNo: this.buildControl(currentRent.house_no, true),
      mobileNumber: this.buildControl(currentRent.mobile_number, true),
      otherPhone: this.buildControl(currentRent.other_phone, true)
    });

  }

  private prepateDataModel(form: FormGroup): Rent {
    const formModel = form.value;
    const conditionDataModel = this.conditionComponent.prepareDataModel(this.vehicleConditionForm);
    const detailDataModel = this.rentDetailComponent.prepareDataModel(this.rentDetailForm);
    detailDataModel.VEHICLE_ID = formModel.vehicleId;
    detailDataModel.RENT_ID = this.rentId;
    detailDataModel.customer = {
          first_name: formModel.firstName,
          last_name: formModel.lastName,
          passport_number: formModel.passportNumber,
          driving_licence_id: formModel.drivingLicenceId,
          nationality: formModel.nationality,
          country: formModel.country,
          city: formModel.city,
          house_no: formModel.houseNo,
          mobile_number: formModel.mobileNumber,
          other_phone: formModel.otherPhone
      };
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
      alert('success');
    } else {
      alert('failed');
    }
  }


}
