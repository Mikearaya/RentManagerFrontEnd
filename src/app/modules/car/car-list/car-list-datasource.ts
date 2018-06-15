import { CarService, Car } from './../car.service';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';

export class VehicleDataSource extends DataSource<Car> {
  private vehiclesSubject = new BehaviorSubject<Car[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countingSubject = new BehaviorSubject<number>(0);
  public loading$ = this.loadingSubject.asObservable();
  public length$ = this.countingSubject.asObservable();

  constructor(private carService: CarService) {
    super();
  }


  connect(collectionViewer: CollectionViewer): Observable<Car[]> {
    return this.vehiclesSubject.asObservable();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(collectionViewer: CollectionViewer) {
    this.vehiclesSubject.complete();
    this.loadingSubject.complete();
  }

  loadVehicles(courseId: number, filter = '',
  sortDirection = 'asc', pageIndex = 0, pageSize = 3) {

  this.loadingSubject.next(true);

this.carService.displayVehicles(courseId, filter, sortDirection, pageIndex, pageSize).pipe(
                          catchError(() => of([])),
                          finalize(() => this.loadingSubject.next(false))
                          )
                          .subscribe(vehicles => {

                            this.countingSubject.next(vehicles.length);
                            if ( pageIndex === 0) {
                              vehicles.splice(pageSize);

                            } else {
                              vehicles.splice(pageIndex * pageSize);
                            }
                            this.vehiclesSubject.next(vehicles);
                          });
  }
}
