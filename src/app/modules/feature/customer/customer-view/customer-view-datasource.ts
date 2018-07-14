import { CustomerService } from './../customer.service';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map, catchError, finalize } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject, of } from 'rxjs';

// TODO: Replace this with your own data model type
export interface CustomerViewModel {
  customers: CustomerView[];
  total: number;
}



export class CustomerViewDataSource extends DataSource<CustomerView> {
  private customerSubject = new BehaviorSubject<CustomerView[]>([]);
  private countingSubject = new BehaviorSubject<number>(0);
  private loadingSubject = new BehaviorSubject<Boolean>(false);
  public totalCustomers$ = this.countingSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public data: CustomerView[];
  constructor(private customerService: CustomerService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<CustomerView[]> {
    return this.customerSubject.asObservable();
  }

  disconnect() {
    this.loadingSubject.complete();
    this.customerSubject.complete();
    this.countingSubject.complete();
  }

  loadCustomers(filter = '', sortColumn = '', sortOrder = '', pageNumber = 0, pageSize = 3) {
    this.loadingSubject.next(true);
    this.customerService.displayCustomers(filter, sortColumn, sortOrder, pageNumber, pageSize).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe((data: CustomerViewModel) => {
          this.countingSubject.next(data.total);
          this.data = data.customers;
          this.customerSubject.next(data.customers);
    });
  }
}


export class CustomerView {
  CUSTOMER_ID: number;
  first_name: String;
  last_name: String;
  passport_number: String;
  nationality: String;
  country: String;
  city: String;
  house_no: String;
  mobile_number: String;
  other_phone: String;
  registered_on: String;
  driving_licence_id: String;
  hotel_name: String;
  hotel_phone: String;
}
