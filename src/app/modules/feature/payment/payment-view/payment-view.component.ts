import { HttpErrorResponse } from '@angular/common/http';
import { PaymentFormComponent } from './../payment-form/payment-form.component';
import { PaymentApiService, PaymentView, Payment } from './../payment-api.service';

import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { PaymentDataSource } from './payment-view-datasource';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, fromEvent } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';


const initialSelection = [];
const allowMultiSelect = true;

@Component({
  selector: 'app-payment-view',
  templateUrl: './payment-view.component.html',
  styleUrls: ['./payment-view.component.css']
})
export class PaymentViewComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  dataSource: PaymentDataSource;
  private payment: Payment;
  selection: SelectionModel<PaymentView>;
  selectedColumns: FormControl;


  paymentColumns = [
                  {key: 'RENT_ID', humanReadable: 'ID'},
                  {key: 'rented_by', humanReadable: 'Customer'},
                  {key: 'total_amount', humanReadable: 'Total Amount'},
                  {key: 'paid_amount', humanReadable: 'Paid Amount'},
                  {key: 'remaining_amount', humanReadable: 'Remaining'},
                  {key: 'total_days', humanReadable: 'Days Rented'},
                  {key: 'start_date', humanReadable: 'Rent Start'},
                  {key: 'return_date', humanReadable: 'return_date'},
                  {key: 'plate_number', humanReadable: 'plate_number'}

                ];
  displayedColumns = ['RENT_ID', 'rented_by', 'total_days',  'total_amount', 'paid_amount', 'remaining_amount', 'action'];

  constructor(private activatedRoute: ActivatedRoute,
               private paymentApiService: PaymentApiService,
              private router: Router,
              private snackBar: MatSnackBar,
            private dialog: MatDialog) {
      this.selectedColumns = new FormControl(this.displayedColumns);

  }

  ngOnInit() {
    this.dataSource = new  PaymentDataSource(this.paymentApiService);
    this.payment = this.activatedRoute.snapshot.data['payment'];
    this.dataSource.loadPayments();
    this.selection = new SelectionModel<PaymentView>(allowMultiSelect, initialSelection);
  }

  manageView(filteredColumns) {
    this.displayedColumns = [];
    filteredColumns.forEach((col) => this.displayedColumns.push(col));
    this.displayedColumns.push('action');
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup').pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => {
        this.paginator.pageIndex = 0;
        this.viewPayments();
      })
    )
    .subscribe();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page).pipe(
      tap(() => this.viewPayments())
    )
    .subscribe();

  } /* ngAfterViewInit End */


  viewPayments() {
    this.selection.clear();
    this.dataSource.loadPayments(this.input.nativeElement.value,
                              this.paginator.pageIndex,
                              this.paginator.pageSize,
                              this.sort.direction,
                              this.sort.active
                                );
  }

  addPayment(selectedPayment: PaymentView) {
    this.payment = {
      RENT_ID: selectedPayment.RENT_ID,
      payment_amount: 0
    };

    const paymentDialogRef =  this.dialog.open(PaymentFormComponent, {
      width: '450px',
      data: {PAYMENT_ID: selectedPayment.plate_number, payment_amount: selectedPayment.rented_by}

    });

    paymentDialogRef.afterClosed().subscribe((paymentAmount) => {

      if ( paymentAmount) {

        this.payment.payment_amount = paymentAmount;

        this.paymentApiService.addPayment(this.payment)
                                  .subscribe((payment: Payment) => {
                                              this.snackBar.open('Payment Saved Successfully');
                                              this.viewPayments();
                                              },
                                            (error: HttpErrorResponse) => this.snackBar.open(error.error));
        }
    });
    // this.router.navigate(['add/payment', {ownerId: selectedPayment.PAYMENT_ID}]);
  }


}
