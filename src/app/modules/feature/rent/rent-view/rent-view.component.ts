import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { RentDataSource, RentView, RentDataModel } from './rent-view-datasource';
import { ActivatedRoute, Router } from '@angular/router';
import { RentService, Rent } from '../rent.service';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

const allowMultiSelect = true;
const initialSelection = [];
@Component({
  selector: 'app-rent-view',
  templateUrl: './rent-view.component.html',
  styleUrls: ['./rent-view.component.css']
})
export class RentViewComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  selection: SelectionModel<RentView>;
  dataSource: RentDataSource;
  private rent: RentView;
  private currentCatagory = '';
  selectedColumns: FormControl;

  constructor(private activatedRoute: ActivatedRoute,
              private rentService: RentService,
              private snackBar: MatSnackBar,
              private router: Router) {
    this.selectedColumns = new FormControl(this.displayedColumns);
    this.currentCatagory = 'active';
}

  rentDetailColumns = [
                        {key: 'plate_number', humanReadable: 'Plate Number' },
                        {key: 'start_date', humanReadable: 'Rented On' },
                        {key: 'return_date', humanReadable: 'Rent End' },
                        {key: 'rented_by', humanReadable: 'Rented By' },
                        {key: 'paid', humanReadable: 'Payment Status' },
                        {key: 'rented_By', humanReadable: 'Rent/Day' },
                        {key: 'total_days', humanReadable: 'Total Days' },
                        {key: 'remaining_days', humanReadable: 'Remaining' },
                        {key: 'status', humanReadable: 'Status' }
                      ];
  displayedColumns = ['select',
                      'rented_by',
                      'plate_number',
                      'start_date',
                      'return_date',
                      'total_days',
                      'remaining_days',
                      'status',
                      'view' ];

  viewRentDetail(selectedRent: Rent) {
      this.router.navigate(['rent/detail', selectedRent.RENT_ID]);
  }
  extendRent(selectedRent: Rent) {
    this.router.navigate(['rent/extend', selectedRent.RENT_ID]);
}
  ngOnInit() {
    this.dataSource = new RentDataSource(this.rentService);
    this.rent = this.activatedRoute.snapshot.data['rent'];
    this.dataSource.loadRents();
    this.selection = new SelectionModel<RentView>(allowMultiSelect, initialSelection);
  }
  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup').pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => {
        this.paginator.pageIndex = 0;
        this.viewRents();
      })
    )
    .subscribe();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page).pipe(
      tap(() => this.viewRents())
    )
    .subscribe();

  } /* ngAfterViewInit End */
  manageView(filteredColumns) {
    this.displayedColumns = filteredColumns;
    this.displayedColumns.splice(0, 0, 'select');
    this.displayedColumns.push('view');
   }

   currentView(data: string) {
     this.currentCatagory = data;
     this.viewRents();
   }
  deleteRents(deletedRents: Rent[]) {
    const deletedIds = [];
    deletedRents.forEach((rent: Rent) => deletedIds.push(`${rent.RENT_ID}`));
    this.rentService.deleteRent(deletedIds).subscribe((result) => console.log(result));
  }

  viewRents() {
    this.selection.clear();
    this.dataSource.loadRents(
                              this.currentCatagory,
                              this.input.nativeElement.value,
                              this.paginator.pageIndex,
                              this.paginator.pageSize,
                              this.sort.direction,
                              this.sort.active
                                );
  }

  viewContrat(selectedRent: any) {
    this.router.navigate([`rent/contrat/${selectedRent.RENT_ID}`]);
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() : this.dataSource.data.forEach((row) => this.selection.select(row));

  }

  deleteRent(deletedRents: RentView[]) {
    const deletedIds = [];
    deletedRents.forEach((rent) => deletedIds.push( `${deletedIds}`));
    this.rentService.deleteRent(deletedIds)
                                    .subscribe((result: Boolean) => this.viewRents(),
                                               (error: HttpErrorResponse) => console.log());
  }

  closeContrat(closedRent: Rent) {
    this.rentService.closeRentContrat(closedRent.RENT_ID)
                                    .subscribe((success: Boolean) => this.snackBar.open('Rent Close Succesfuly!!!'),
                                              (error: HttpErrorResponse) => this.snackBar.open('Failed To Close Rent Try Again!!!')

                                    );
  }
}
