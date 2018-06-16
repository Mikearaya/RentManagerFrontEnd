import { OwnerService , Owner} from './../owner.service';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';

// TODO: Replace this with your own data model type
export interface OwnerListItem {
  name: string;
  id: number;
}

export class OwnerDataSource extends DataSource<Owner> {
  private ownerSubject = new BehaviorSubject<Owner[]>([]);
  private countingSubject = new BehaviorSubject<number>(0);
  private loadingSubject = new BehaviorSubject<Boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  public totalOwners$ = this.countingSubject.asObservable();

  constructor(private ownerService: OwnerService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Owner[]> {
    return this.ownerSubject.asObservable();
  }

  disconnect() {
    this.ownerSubject.complete();
    this.loadingSubject.complete();
    this.countingSubject.complete();
  }


  loadOwners(filter = '', pageIndex = 0, pageSize = 10, sortOrder = 'asc', sortColumn = 'first_name') {
    this.loadingSubject.next(true);
    this.ownerService.displayOwners(filter, pageIndex, pageSize, sortOrder, sortColumn).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe((owner) => {
          this.countingSubject.next(owner.length);
          if ( pageIndex === 0) {
            owner.splice(pageSize);

          } else {
            owner.splice(pageIndex * pageSize);
          }
          this.ownerSubject.next(owner);
    });
  }
}
