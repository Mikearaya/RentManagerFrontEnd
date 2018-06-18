import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { RentDataSource, RentViewDataModel } from './rent-view-datasource';
import { ActivatedRoute, Router } from '@angular/router';
import { RentService, Rent } from '../rent.service';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';

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
  selection: SelectionModel<RentViewDataModel>;
  dataSource: RentDataSource;
  private rent: RentViewDataModel;

  constructor(private activatedRoute: ActivatedRoute,
    private rentService: RentService,
  private router: Router) {

}
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'number', 'plate_number', 'start_date', 'return_date', 'rented_by'];

  ngOnInit() {
    this.dataSource = new RentDataSource(this.rentService);
    this.rent = this.activatedRoute.snapshot.data['rent'];
    this.dataSource.loadRents();
    this.selection = new SelectionModel<RentViewDataModel>(allowMultiSelect, initialSelection);
  }
  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup').pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => {
        this.paginator.pageIndex = 0;
        this.viewOwners();
      })
    )
    .subscribe();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page).pipe(
      tap(() => this.viewOwners())
    )
    .subscribe();

  } /* ngAfterViewInit End */

  deleteOwners(deletedRents: Rent[]) {
    const deletedIds = [];
    deletedRents.forEach((rent: Rent) => deletedIds.push(`${rent.RENT_ID}`));
    this.rentService.deleteRent(deletedIds).subscribe((result) => console.log(result));
  }

  viewOwners() {
    this.dataSource.loadRents(this.input.nativeElement.value,
                              this.paginator.pageIndex,
                              this.paginator.pageSize,
                              this.sort.direction,
                              this.sort.active
                                );
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() : this.dataSource.data.forEach((row) => this.selection.select(row));

  }
  editRent(selectedVehicle: RentViewDataModel) {
    this.router.navigate([`/manage/vehicle/${selectedVehicle.VEHICLE_ID}`]);
  }

  deleteVehicles(deletedVehicles: RentViewDataModel[]) {

  }
}
