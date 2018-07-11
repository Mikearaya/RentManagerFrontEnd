import { Owner } from './../owner.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OwnerService } from '../../owner/owner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarDismiss, MatSnackBarRef } from '@angular/material';

@Component({
  selector: 'app-owner-form',
  templateUrl: './owner-form.component.html',
  styleUrls: ['./owner-form.component.css']
})
export class OwnerFormComponent implements OnInit {

  ownerForm: FormGroup;
  title: String;
  errorMessages: string[];
  private owner: Owner;
  private currentOwnerId: number;
  private isUpdate: Boolean = false;
  private selfContained: Boolean = false;
  private redirectedFromVehicle: String = 'false';


  constructor(private ownerService: OwnerService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
                this.generateForm();
              }

    ngOnInit() {
      this.currentOwnerId = + this.activatedRoute.snapshot.paramMap.get('id');
      this.redirectedFromVehicle = this.activatedRoute.snapshot.paramMap.get('from_vehicle');
      this.title = this.activatedRoute.snapshot.data['title'];
      this.selfContained =   this.activatedRoute.snapshot.data['selfContained'];
    if (this.currentOwnerId) {
      this.isUpdate = true;
       this.ownerService.getOwner(this.currentOwnerId).subscribe((owner: Owner) => this.generateForm(owner));
    }
    }


isSelfContained() {
  return this.selfContained;
}
    generateForm(currentOwner: any = '') {
      this.ownerForm = this.formBuilder.group({
        firstName: this.buildControl(currentOwner.first_name, true),
        lastName: this.buildControl(currentOwner.last_name, true),
        mobilePhone: this.buildControl(currentOwner.mobile_number, true),
        city: this.buildControl(currentOwner.city, true),
        subCity: this.buildControl(currentOwner.sub_city, true),
        wereda: this.buildControl(currentOwner.wereda, true),
        houseNumber: this.buildControl(currentOwner.house_number, true)
      });
    }

    prepareDataModel(ownerInfo: any): Owner {

      const dataModel: Owner = {
          OWNER_ID: this.currentOwnerId,
          first_name: ownerInfo.firstName,
          last_name: ownerInfo.lastName,
          mobile_number: ownerInfo.mobilePhone,
          city: ownerInfo.city,
          sub_city: ownerInfo.subCity,
          wereda: ownerInfo.wereda,
          house_number: ownerInfo.houseNumber
      };
    return dataModel;
  }

  handelSuccess(result: Owner) {
      const snackBar = this.snackBar.open('Partner Information Saved Successfully', 'Add Vehicle');
      snackBar.afterDismissed().subscribe((snack: MatSnackBarDismiss) => {
        if (snack.dismissedByAction) {
          this.router.navigate(['add/vehicle', {ownerId: result.OWNER_ID}]);
        } else if (this.redirectedFromVehicle === 'true') {
          this.router.navigate(['add/vehicle/']);
        } else {
          this.router.navigate(['owners']);
        }
      });
  }

  handelError(error: HttpErrorResponse) {
    this.errorMessages = error.error;
    this.snackBar.open('Error Occured While Saving Partner Information');
  }


    onSubmit() {

      this.owner = this.prepareDataModel(this.ownerForm.value);

    if (this.isUpdate) {
    this.ownerService.updateOwner(this.owner)
                              .subscribe((success: Owner) => this.handelSuccess(success),
                                          (error: HttpErrorResponse) => this.handelError(error));
    } else {
      this.ownerService.saveOwner(this.owner)
                  .subscribe(
                            (success: Owner) => this.handelSuccess(success),
                            (error: HttpErrorResponse) => this.handelError(error)
                            );
    }
    }
    buildControl(value = '', required = false) {
      return (required) ? [value, Validators.required] : value;
    }

}
