import { Car } from './../car.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CarService } from '../car.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent implements OnInit {
  private car: Car;
  private currentId: number;

  COLORS = ['Red', 'Green', 'Blue', 'White', 'Silver' , 'Brown', 'Black'];
  CAR_TYPES = ['Automobile', '4 Wheel Drive', 'Sedan', 'Hatch Back', 'Limosine', 'Pickup'];
  FUIEL_TYPES = ['Bensine', 'Dissel'];
  carForm: FormGroup;
  private isUpdate: Boolean = false;
  title: String = 'Add New';

  constructor(  private activatedRoute: ActivatedRoute,
                private carService: CarService,
              private formBuilder: FormBuilder
            ) {
              this.generateForm();
            }

  ngOnInit() {
    this.currentId = + this.activatedRoute.snapshot.paramMap.get('vehicleId');


    this.title = this.activatedRoute.snapshot.data['title'];
    if (this.currentId) {
      this.isUpdate = true;
       this.carService.getCar(this.currentId).subscribe((car: any) => this.generateForm(car));
    }
  }

  generateForm(currentVehicle: any = '') {
    this.car = currentVehicle;
    this.carForm = this.formBuilder.group({
      make: this.buildControl(currentVehicle.make, true),
      model: this.buildControl(currentVehicle.model, true),
      yearMade: this.buildControl(currentVehicle.year_made, true),
      color: this.buildControl(currentVehicle.color, true),
      type: this.buildControl(currentVehicle.type, true),
      chassisNo: this.buildControl(currentVehicle.chassis_number, true),
      motorNo: this.buildControl(currentVehicle.motor_number, true),
      fuiel: this.buildControl(currentVehicle.fuiel_type, true),
      cc: this.buildControl(currentVehicle.cc, true),
      totalPassanger: this.buildControl(currentVehicle.total_passanger, true),
      cylinder: this.buildControl(currentVehicle.cylinder_count, true),
      libre: this.buildControl(currentVehicle.libre_no, true),
      plateCode: this.buildControl(currentVehicle.plate_code, true),
      plateNumber: this.buildControl(currentVehicle.plate_number, true),
    });
  }

  prepareDataModel(carInfo: any): Car {
      const dataModel = {
          VEHICLE_ID: this.currentId,
          OWNER_ID: 3,
          make: carInfo.make,
          model: carInfo.model,
          year_made: carInfo.yearMade,
          color: carInfo.color,
          type: carInfo.type,
          chassis_number: carInfo.chassisNo,
          motor_number: carInfo.motorNo,
          fuiel_type: carInfo.fuiel,
          cc: carInfo.cc,
          total_passanger: carInfo.totalPassanger,
          cylinder_count: carInfo.cylinder,
          libre_no: carInfo.libre,
          plate_code: carInfo.plateCode,
          plate_number: carInfo.plateNumber

      };
    return dataModel;
  }

  buildControl(value = '', required = false) {
    return (required) ? [value, Validators.required] : value;
  }

  handelResponse(result: any) {
    if (result) {
      alert('success');
    } else {
      alert('failed');
    }
  }

  onSubmit() {
    this.car = this.prepareDataModel(this.carForm.value);
    if (this.isUpdate) {
    this.carService.updateCar(this.car).subscribe((result) => this.handelResponse(result));
    } else {
      this.carService.saveCar(this.car).subscribe((result) => this.handelResponse(result));
    }
  }
}
