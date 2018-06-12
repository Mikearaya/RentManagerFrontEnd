import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CarService } from '../../car/car.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-owner-form',
  templateUrl: './owner-form.component.html',
  styleUrls: ['./owner-form.component.css']
})
export class OwnerFormComponent implements OnInit {

  ownerForm: FormGroup;
  currentAction = 'Add New';

  constructor(private carService: CarService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute) {
                this.generateForm();
              }

    ngOnInit() {
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

    onSubmit() { }

}
