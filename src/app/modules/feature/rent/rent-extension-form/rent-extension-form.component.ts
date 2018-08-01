import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RentService } from '../rent.service';

@Component({
  selector: 'app-rent-extension-form',
  templateUrl: './rent-extension-form.component.html',
  styleUrls: ['./rent-extension-form.component.css']
})
export class RentExtensionFormComponent implements OnInit {
 extensionForm: FormGroup;
 rentId: number;
  constructor(private rentService: RentService,
              private activatedRoute: ActivatedRoute,
            private formBuilder: FormBuilder,
            private router: Router,
          private snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.rentId = + this.activatedRoute.snapshot.paramMap.get('rentId');
    this.generateForm();
  }

  generateForm() {
    this.extensionForm = this.formBuilder.group({
      'extendedDays' : ['', [Validators.required, Validators.pattern('[0-9]+')]],
      'ownerRentingPrice': ['', [Validators.required, Validators.pattern('[0-9]+')] ],
      'rentedPrice' : ['', [Validators.required, Validators.pattern('[0-9]+')]],
      'initialPayment': ['', [Validators.required, Validators.pattern('[0-9]+')]]
    });
  }


  prepareDataModel() {
    const formModel = this.extensionForm.value;
    const dataModel = {
      'RENT_ID': this.rentId,
      'extended_days' : formModel.extendedDays,
      'owner_renting_price': formModel.ownerRentingPrice,
      'rented_price': formModel.rentedPrice,
      'initial_payment': formModel.initialPayment
    };
    return dataModel;
  }


  onSubmit() {
    const extendedRent = this.prepareDataModel();
    this.rentService.extendRent(extendedRent)
                            .subscribe((result: Boolean) => {
                              this.snackBar.open('Rent Extended Successfuly');
                              this.router.navigate(['rents']);
                             } );
  }
}
