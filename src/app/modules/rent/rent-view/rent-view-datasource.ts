import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import {RentService } from '../rent.service';



export class RentDataSource extends DataSource<RentViewDataModel> {
  private rentSubject = new BehaviorSubject<RentViewDataModel[]>([]);
  private countingSubject = new BehaviorSubject<number>(0);
  private loadingSubject = new BehaviorSubject<Boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  public totalRents$ = this.countingSubject.asObservable();
  public data: RentViewDataModel[];

  constructor(private rentService: RentService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<RentViewDataModel[]> {
    return this.rentSubject.asObservable();
  }

  disconnect() {
    this.rentSubject.complete();
    this.loadingSubject.complete();
    this.countingSubject.complete();
  }


  loadRents(filter = '', pageIndex = 0, pageSize = 10, sortOrder = 'asc', sortColumn = 'first_name') {
    this.loadingSubject.next(true);
    this.rentService.displayRents(filter, pageIndex, pageSize, sortOrder, sortColumn).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe((rent) => {
          this.countingSubject.next(rent.length);
          if ( pageIndex === 0) {
            rent.splice(pageSize);

          } else {
            rent.splice(pageIndex * pageSize);
          }
          this.data = rent;
          this.rentSubject.next(rent);
    });
  }

}


export class RentViewDataModel {
  VEHICLE_ID: number;
  rented_by: string;
  start_date: string;
  return_date: string;
  full_name: string;
  plate_number: string;
  payment_status: string;
}
