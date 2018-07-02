import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Rent, RentService } from '../rent.service';
import { Car, CarService } from '../../car/car.service';

@Component({
  selector: 'app-rent-detail-form',
  templateUrl: './rent-detail-form.component.html',
  styleUrls: ['./rent-detail-form.component.css']
})
export class RentDetailFormComponent implements OnInit {
  form: FormGroup;
  minDate: Date;
  currentDetail: Rent;
  @Input('rentId') rentId: number;
  private isUpdate: Boolean = false;
  vehicleId: number;
  CARS: Car[];

  public selectedMoments = [
        new Date(2018, 1, 12, 10, 30),
        new Date(2018, 3, 21, 20, 30)
    ];

  constructor(private formBuilder: FormBuilder,
              private rentService: RentService,
              private carService: CarService,
              private activatedRoute: ActivatedRoute) {
                this.generateForm();
                this.carService.getAllCars().subscribe((cars: Car[]) => this.CARS = cars);
              }

  ngOnInit() {
    this.minDate = new Date();
    this.vehicleId = + this.activatedRoute.snapshot.paramMap.get('vehicleId');
  }

  private generateForm(currentRent: any = '') {
    this.currentDetail = (currentRent) ? (<Rent>currentRent) : null;
const x = new Date();
      this.form = this.formBuilder.group({
        vehicleId: this.buildControl(`${this.vehicleId}`, true),
        returnDate: this.buildControl(currentRent.return_date, true),
        startDate: (currentRent.start_date) ? [currentRent.start_date, Validators.required] : [new Date(), Validators.required],
        initialPayment: this.buildControl(currentRent.initial_payment, true),
        ownerRentingPrice: this.buildControl(currentRent.owner_renting_price, true),
        rentedPrice: this.buildControl(currentRent.rented_price, true),
        colateral: this.buildControl(currentRent.colateral, true),
      });

    }

  prepareDataModel(form: FormGroup): Rent {
      const formModel = form.value;
      const dataModel: Rent =  {
        RENT_ID: this.rentId,
        VEHICLE_ID: formModel.vehicleId,
        start_date: this.selectedMoments[0].toISOString(),
        return_date: this.selectedMoments[1].toISOString(),
        owner_renting_price: formModel.ownerRentingPrice,
        rented_price: formModel.rentedPrice,
        initial_payment: formModel.initialPayment,
       colateral_deposit: formModel.colateralDeposit
      };
      return dataModel;
    }
changed(val: any) {
  console.log(val);
}
    onSubmit() {
      this.currentDetail = this.prepareDataModel(this.form);
    }

    private buildControl(value = '', required = false) {
      return (required) ? [value , Validators.required] : value;
    }

}
