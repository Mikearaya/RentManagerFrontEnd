import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import {RentService } from '../rent.service';

export interface RentDataModel {
  rents: RentView[];
  total: number;
}


export class RentDataSource extends DataSource<RentView> {
  private rentSubject = new BehaviorSubject<RentView[]>([]);
  private countingSubject = new BehaviorSubject<number>(0);
  private loadingSubject = new BehaviorSubject<Boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  public totalRents$ = this.countingSubject.asObservable();
  public data: RentView[];

  constructor(private rentService: RentService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<RentView[]> {
    return this.rentSubject.asObservable();
  }

  disconnect() {
    this.rentSubject.complete();
    this.loadingSubject.complete();
    this.countingSubject.complete();
  }


  loadRents(filter = '', pageIndex = 0, pageSize = 5, sortOrder = 'DESC', sortColumn = 'added_on') {
    this.loadingSubject.next(true);
    this.rentService.displayRents(filter, pageIndex, pageSize, sortOrder, sortColumn).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe((data: RentDataModel) => {
          this.countingSubject.next(data.total);
          this.data = data.rents;
          this.rentSubject.next(data.rents);
    });
  }

}


export class RentView {
  VEHICLE_ID: number;
  rented_by: string;
  start_date: string;
  return_date: string;
  full_name: string;
  plate_number: string;
  payment_status: string;
}
