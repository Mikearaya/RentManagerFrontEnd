
import { OwnerService, Owner } from './../../owner/owner.service';
import { MatSnackBar, MatSnackBarDismiss } from '@angular/material';
import { Car } from './../car.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CarService } from '../car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent implements OnInit {
  private car: Car;
  private currentId: number;
  errorMessages: string[];
  filteredOwners$: Observable<Owner[]>;
  COLORS = ['Red', 'Green', 'Blue', 'White', 'Silver' , 'Brown', 'Black'];
  CAR_TYPES = ['Automobile', '4 Wheel Drive', 'Sedan', 'Hatch Back', 'Limosine', 'Pickup'];
  FUIEL_TYPES = ['Bensine', 'Dissel'];
  carForm: FormGroup;
  private isUpdate: Boolean = false;
  title: String = 'Add New';
private OWNERS: Owner[] = [];
private currentOwnerId: number;
  constructor(  private activatedRoute: ActivatedRoute,
                private carService: CarService,
                private ownerService: OwnerService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router
            ) {
              this.generateForm();
            }

  ngOnInit() {
    this.currentId = + this.activatedRoute.snapshot.paramMap.get('vehicleId');
    this.currentOwnerId = + this.activatedRoute.snapshot.paramMap.get('ownerId');
    this.title = this.activatedRoute.snapshot.data['title'];

    this.ownerService.getAllOwners().subscribe((owners: any) => this.OWNERS = owners.owners );

    if (this.currentId) {
      this.isUpdate = true;
       this.carService.getCar(this.currentId).subscribe((car: any) => this.generateForm(car));
    }

    this.filteredOwners$ = this.carForm.get('owner').valueChanges.pipe(
      startWith(''),
      map(value => this._filterOwner(value))
    );
  }

  private _filterOwner(value): Owner[] {
    if (value instanceof Object) {
      return [];
    }
    const filterValue = value.toLowerCase();
    return this.OWNERS.filter((customer: Owner) => customer.first_name.toLowerCase().includes(filterValue));
  }
  hasOwnerId() {
    return this.currentOwnerId;
  }

  displayOwnerWith(owner?: Owner): string | undefined {
    return owner ? `${owner.first_name} - ${owner.last_name}` : undefined;
  }

  generateForm(currentVehicle: any = '') {
    this.car = currentVehicle;
    this.carForm = this.formBuilder.group({
      owner: (currentVehicle.OWNER_ID) ?
                         [currentVehicle.OWNER_ID, [Validators.required, ownerValidator]] : ['', [Validators.required, ownerValidator]],
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

  prepareDataModel(): Car {
    const carInfo = this.carForm.value;
      const dataModel = {
          VEHICLE_ID: this.currentId,
          OWNER_ID: carInfo.owner.OWNER_ID,
          make: carInfo.make,
          model: carInfo.model,
          year_made: carInfo.yearMade.getFullYear(),
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

  handelSuccess(result: Car) {
    this.snackBar.open('Vehicle Saved Successfully');
        this.router.navigate(['vehicles']);
}

handelError(error: HttpErrorResponse) {
  this.errorMessages = error.error;
  this.snackBar.open('Error Occured While Saving Vehicle Information');
}


  onSubmit() {
    this.car = this.prepareDataModel();
    if (this.isUpdate) {
    this.carService.updateCar(this.car)
                    .subscribe((success: Car) => this.handelSuccess(success),
                              (error: HttpErrorResponse) => this.handelError(error));
    } else {
      this.carService.saveCar(this.car)
                          .subscribe((success: Car) => this.handelSuccess(success),
                          (error: HttpErrorResponse) => this.handelError(error));
    }
  }
}
function ownerValidator(value: AbstractControl): {[key: string]: boolean} | null {
  if ( value.value instanceof Object) {
      return null;
  } else {
    return { 'validEmployee' : true };
  }
}
