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
  private id: number;
  currentAction = 'Add New';
  private isUpdate: Boolean = false;
  constructor(private ownerService: OwnerService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute) {
                this.generateForm();
              }

    ngOnInit() {
      this.id = + this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.isUpdate = true;
      this.currentAction = 'Update';
       this.ownerService.getOwner(this.id).subscribe((result) => this.generateForm(result[0]));
    }
    }

    generateForm(currentOwner: any = '') {
      this.ownerForm = this.formBuilder.group({
        'firstName': ['', Validators.required],
        'lastName': ['', Validators.required],
        'mobilePhone': ['', Validators.required],
        'otherPhone': [''],
        'city': ['', Validators.required],
        'subCity': ['', Validators.required],
        'wereda': ['', Validators.required]

      });
    }

    prepareDataModel(ownerInfo: any): Owner {
      const dataModel = {
          OWNER_ID: this.id,
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

}
