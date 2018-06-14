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
  private id: number;

  COLORS = ['Red', 'Green', 'Blue', 'White', 'Silver' , 'Brown', 'Black'];
  CAR_TYPES = ['Automobile', '4 Wheel Drive', 'Sedan', 'Hatch Back', 'Limosine', 'Pickup'];
  FUIEL_TYPES = ['Bensine', 'Dissel'];
  carForm: FormGroup;
  isUpdate: Boolean = false;
  currentAction: String = 'Add New';

  constructor(private carService: CarService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute
            ) {
              this.generateForm();
            }

  ngOnInit() {
    this.id = + this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.isUpdate = true;
      this.currentAction = 'Update';
       this.carService.getCar(this.id).subscribe((result) => this.generateForm(result[0]));
    }
  }

  generateForm(currentCar: Car = null) {
    this.car = currentCar;
    this.carForm = this.formBuilder.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      yearMade: ['', Validators.required],
      color: ['', Validators.required],
      type: ['', Validators.required],
      chassisNo: ['', Validators.required],
      motorNo: ['', Validators.required],
      fuiel: ['', Validators.required],
      cc: ['', Validators.required],
      totalPassanger: ['', Validators.required],
      cylinder: ['', Validators.required],
      libre: ['', Validators.required],
      plateCode: ['', Validators.required],
      plateNumber: ['', Validators.required]
    });
  }

  prepareDataModel(carInfo: any): Car {
      const dataModel = {
          CAR_ID: this.id,
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
