import { CarService, Car } from './../car.service';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';

export interface VehicleDataModel {
  vehicles: Car[];
  total: number;
}

export class VehicleDataSource extends DataSource<Car> {
      private vehiclesSubject = new BehaviorSubject<Car[]>([]);
      private loadingSubject = new BehaviorSubject<boolean>(false);
      private countingSubject = new BehaviorSubject<number>(0);
      public loading$ = this.loadingSubject.asObservable();
      public length$ = this.countingSubject.asObservable();
      public data: Car[];

        constructor(private carService: CarService) {
          super();
        }


        connect(collectionViewer: CollectionViewer): Observable<Car[]> {
          return this.vehiclesSubject.asObservable();
        }

        disconnect(collectionViewer: CollectionViewer) {
          this.vehiclesSubject.complete();
          this.loadingSubject.complete();
          this.countingSubject.complete();
        }

        loadVehicles(ownerId: number = 0, catagory = 'all', filter = '',
        sortDirection = 'asc', sortColumn = '', pageIndex = 0, pageSize = 3) {

        this.loadingSubject.next(true);

              this.carService.displayVehicles(ownerId, catagory, filter, sortDirection, sortColumn, pageIndex, pageSize).pipe(
                                catchError(() => of([])),
                                finalize(() => this.loadingSubject.next(false))
                                )
                                .subscribe((data: VehicleDataModel) => {

                                  this.countingSubject.next(data.total);

                                  this.data = data.vehicles;
                                  this.vehiclesSubject.next(data.vehicles);
                                });
      }
}
