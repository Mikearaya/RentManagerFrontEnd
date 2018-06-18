import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Car, CarService } from 'src/app/modules/car/car.service';
import { RentService, Rent } from 'src/app/modules/rent/rent.service';

@Component({
  selector: 'app-rent-form',
  templateUrl: './rent-form.component.html',
  styleUrls: ['./rent-form.component.css']
})
export class RentFormComponent implements OnInit {
   title: string;
   rentForm: FormGroup;
  private rent: Rent;
  private rentId: number;
  rentDetail: FormGroup;
  CARS: Car[];
  private vehicleId: number;
   isUpdate: Boolean = false;
   IDENTIFICATIONS = [{type: 'Driver Licence'}, {type: 'Passport'}, {type: 'Local ID'}];

  constructor(private rentService: RentService,
              private formBuilder: FormBuilder,
              private carService: CarService,
              private activatedRoute: ActivatedRoute) {
                this.generateForm();
                this.carService.getCar().subscribe((cars: Car[]) => this.CARS = cars);
              }

  ngOnInit() {
    this.vehicleId = + this.activatedRoute.snapshot.paramMap.get('vehicleId');
    this.rentId = + this.activatedRoute.snapshot.paramMap.get('rentId');
    this.title = this.activatedRoute.snapshot.data['title'];
      if (this.vehicleId) {
        this.isUpdate = true;
        this.rentService.getRent(this.rentId).subscribe((result: Rent[]) => this.generateForm(result));
      }
  }

  private generateForm(currentRent: any = '') {
    this.rent = (currentRent) ? (<Rent>currentRent) : null;
    this.rentForm = this.formBuilder.group({
      rentDetail: this.formBuilder.group({
        returnDate: this.buildControl(currentRent.return_date, true),
        startDate: this.buildControl(currentRent.start_date, true),
        initialPayment: this.buildControl(currentRent.initial_payment, true),
        ownerRentingPrice: this.buildControl(currentRent.owner_renting_price, true),
        rentedPrice: this.buildControl(currentRent.rented_price, true),
      }),
      vehicleId: this.buildControl(currentRent.vehicle, true),
      firstName: this.buildControl(currentRent.first_name, true),
      lastName: this.buildControl(currentRent.last_name, true),
      idType: this.buildControl(currentRent.id_type, true),
      idNumber: this.buildControl(currentRent.id_number, true),
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
    const dataModel: Rent =  {
      RENT_ID: this.rentId,
      VEHICLE_ID: formModel.vehicleId,
      start_date: formModel.rentDetail.startDate,
      return_date: formModel.rentDetail.returnDate,
      owner_renting_price: formModel.rentDetail.ownerRentingPrice,
      rented_price: formModel.rentDetail.rentedPrice,
      initial_payment: formModel.rentDetail.initialPayment,
      customer: {
          first_name: formModel.firstName,
          last_name: formModel.lastName,
          id_type: formModel.idType,
          id_number: formModel.idNumber,
          nationality: formModel.nationality,
          country: formModel.country,
          city: formModel.city,
          house_no: formModel.houseNo,
          mobile_number: formModel.mobileNumber,
          other_phone: formModel.otherPhone
      }
    };
    return dataModel;
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