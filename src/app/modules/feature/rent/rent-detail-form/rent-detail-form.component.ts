import { SelectionModel } from '@angular/cdk/collections';
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
        selectedMoments: (currentRent.start_date) ? [currentRent.start_date, Validators.required] : ['', Validators.required],
        initialPayment: this.buildControl(currentRent.initial_payment, true),
        ownerRentingPrice: this.buildControl(currentRent.owner_renting_price, true),
        rentedPrice: this.buildControl(currentRent.rented_price, true),
        colateralDeposit: this.buildControl(currentRent.colateral_deposit, true),
      });

    }

  prepareDataModel(): Rent {
      const formModel = this.form.value;
      const dataModel: Rent =  {
        RENT_ID: this.rentId,
        VEHICLE_ID: formModel.vehicleId,
        start_date: formModel.selectedMoments[0].toISOString(),
        return_date: formModel.selectedMoments[1].toISOString(),
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
      this.currentDetail = this.prepareDataModel();
    }

    private buildControl(value = '', required = false) {
      return (required) ? [value , Validators.required] : value;
    }

}
