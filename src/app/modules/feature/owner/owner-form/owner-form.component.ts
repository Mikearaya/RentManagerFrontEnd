import { Owner } from './../owner.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OwnerService } from '../../owner/owner.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-owner-form',
  templateUrl: './owner-form.component.html',
  styleUrls: ['./owner-form.component.css']
})
export class OwnerFormComponent implements OnInit {

  ownerForm: FormGroup;
  private owner: Owner;
  private currentOwnerId: number;
  currentAction = 'Add New';
  private isUpdate: Boolean = false;
  constructor(private ownerService: OwnerService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute) {
                this.generateForm();
              }

    ngOnInit() {
      this.currentOwnerId = + this.activatedRoute.snapshot.paramMap.get('id');
    if (this.currentOwnerId) {
      this.isUpdate = true;
      this.currentAction = 'Update';
       this.ownerService.getOwner(this.currentOwnerId).subscribe((owner: Owner) => this.generateForm(owner));
    }
    }

    generateForm(currentOwner: any = '') {
      if (currentOwner instanceof Owner ) {
        this.owner = currentOwner;
      }
      this.ownerForm = this.formBuilder.group({
        'firstName': this.buildControl(currentOwner.first_name, true),
        'lastName': this.buildControl(currentOwner.last_name, true),
        'mobilePhone': this.buildControl(currentOwner.mobile_number, true),
        'otherPhone': this.buildControl(currentOwner.other_phones),
        'city': this.buildControl(currentOwner.city, true),
        'subCity': this.buildControl(currentOwner.sub_city, true),
        'wereda': this.buildControl(currentOwner.wereda, true)
      });
    }

    prepareDataModel(ownerInfo: any): Owner {

      const dataModel = {
          OWNER_ID: this.currentOwnerId,
          first_name: ownerInfo.firstName,
          last_name: ownerInfo.lastName,
          mobile_number: ownerInfo.mobilePhone,
          other_phones: ownerInfo.otherPhone,
          city: ownerInfo.city,
          sub_city: ownerInfo.subCity,
          wereda: ownerInfo.wereda
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

      this.owner = this.prepareDataModel(this.ownerForm.value);

    if (this.isUpdate) {
    this.ownerService.updateOwner(this.owner).subscribe((result) => this.handelResponse(result));
    } else {
      this.ownerService.saveOwner(this.owner).subscribe((result) => this.handelResponse(result));
    }
    }
    buildControl(value = '', required = false) {
      return (required) ? [value, Validators.required] : value;
    }

}
