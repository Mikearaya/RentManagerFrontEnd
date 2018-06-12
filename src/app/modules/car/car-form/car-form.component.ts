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
  COLORS = ['Red', 'Green', 'Blue', 'White', 'Silver' , 'Brown', 'Black'];
  CAR_TYPES = ['Automobile', '4 Wheel Drive', 'Sedan', 'Hatch Back', 'Limosine', 'Pickup'];
  FUIEL_TYPES = ['Bensine', 'Dissel'];
  carForm: FormGroup;

  constructor(private carService: CarService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute
            ) {
              this.generateForm();
            }

  ngOnInit() { }

  generateForm(currentCar: any = '') {
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
      libre: ['', Validators.required]
    });
  }

  onSubmit() { }
}
