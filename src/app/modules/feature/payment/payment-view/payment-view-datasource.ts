import { PaymentDataModel } from './payment-view-datasource';
import { PaymentView, PaymentApiService } from './../payment-api.service';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';


export interface PaymentDataModel {
  payments: PaymentView[];
  total: number;
}

export class PaymentDataSource extends DataSource<PaymentView> {
  private paymentSubject = new BehaviorSubject<PaymentView[]>([]);
  private countingSubject = new BehaviorSubject<number>(0);
  private loadingSubject = new BehaviorSubject<Boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  public totalPayments$ = this.countingSubject.asObservable();
  public data: PaymentView[];

  constructor(private paymentService: PaymentApiService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<PaymentView[]> {
    return this.paymentSubject.asObservable();
  }

  disconnect() {
    this.paymentSubject.complete();
    this.loadingSubject.complete();
    this.countingSubject.complete();
  }


  loadPayments(filter = '', pageIndex = 0, pageSize = 5, sortOrder = 'desc', sortColumn = 'required_payment') {
    this.loadingSubject.next(true);
    this.paymentService.displayPayments(filter, pageIndex, pageSize, sortOrder, sortColumn).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe((data: PaymentDataModel) => {
          this.countingSubject.next(data.total);
          this.data = data.payments;
          this.paymentSubject.next(data.payments);
    });
  }
}
