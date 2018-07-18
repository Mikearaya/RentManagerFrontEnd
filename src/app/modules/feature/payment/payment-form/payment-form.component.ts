import { Payment } from './../payment-api.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {

  constructor(private dialogRep: MatDialogRef<PaymentFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Payment) { }

  ngOnInit() {
  }

}

