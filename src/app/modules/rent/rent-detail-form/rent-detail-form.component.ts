import { ActivatedRoute } from '@angular/router';
import { RentService } from 'src/app/modules/rent/rent.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Rent } from '../rent.service';

@Component({
  selector: 'app-rent-detail-form',
  templateUrl: './rent-detail-form.component.html',
  styleUrls: ['./rent-detail-form.component.css']
})
export class RentDetailFormComponent implements OnInit {
  form: FormGroup;
  currentDetail: Rent;
  private rentId: number;
  private isUpdate: Boolean = false;

  constructor(private formBuilder: FormBuilder,
              private rentService: RentService,
              private activatedRoute: ActivatedRoute) {
                this.generateForm();
              }

  ngOnInit() {
  }

  private generateForm(currentRent: any = '') {
    this.currentDetail = (currentRent) ? (<Rent>currentRent) : null;

      this.form = this.formBuilder.group({
        returnDate: this.buildControl(currentRent.return_date, true),
        startDate: this.buildControl(currentRent.start_date, true),
        initialPayment: this.buildControl(currentRent.initial_payment, true),
        ownerRentingPrice: this.buildControl(currentRent.owner_renting_price, true),
        rentedPrice: this.buildControl(currentRent.rented_price, true),
      });

    }

  prepareDataModel(form: FormGroup): Rent {
      const formModel = form.value;
      const dataModel: Rent =  {
        RENT_ID: this.rentId,
        VEHICLE_ID: formModel.vehicleId,
        start_date: formModel.startDate,
        return_date: formModel.returnDate,
        owner_renting_price: formModel.ownerRentingPrice,
        rented_price: formModel.rentedPrice,
        initial_payment: formModel.initialPayment
      };
      return dataModel;
    }

    onSubmit() {
      this.currentDetail = this.prepareDataModel(this.form);
    }

    private buildControl(value = '', required = false) {
      return (required) ? [value , Validators.required] : value;
    }

}
