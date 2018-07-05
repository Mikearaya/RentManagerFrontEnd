import { SelectionModel } from '@angular/cdk/collections';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { OwnerService, Owner } from './../owner.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { OwnerDataSource } from './owner-list-datasource';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, merge } from 'rxjs';
import { FormControl } from '@angular/forms';


const initialSelection = [];
const allowMultiSelect = true;
@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  dataSource: OwnerDataSource;
  private owner: Owner;
  selection: SelectionModel<Owner>;
  selectedColumns: FormControl;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  ownerColumns = [
                  {key: 'index', humanReadable: '#'},
                  {key: 'first_name', humanReadable: 'First Name'},
                  {key: 'last_name', humanReadable: 'Last Name'},
                  {key: 'mobile_number', humanReadable: 'Mobile'},
                  {key: 'city', humanReadable: 'City'},
                  {key: 'sub_city', humanReadable: 'Sub-City'},
                  {key: 'wereda', humanReadable: 'Wereda'}
                ];
  displayedColumns = ['select',  'first_name', 'last_name', 'mobile_number', 'city', 'sub_city', 'wereda'];

  constructor(private activatedRoute: ActivatedRoute,
               private ownerService: OwnerService,
              private router: Router) {
this.selectedColumns = new FormControl(this.displayedColumns);

  }

  ngOnInit() {
    this.dataSource = new OwnerDataSource(this.ownerService);
    this.owner = this.activatedRoute.snapshot.data['owner'];
    this.dataSource.loadOwners();
    this.selection = new SelectionModel<Owner>(allowMultiSelect, initialSelection);
  }

  manageView(filteredColumns) {
    this.displayedColumns = ['select'];
    filteredColumns.forEach((col) => this.displayedColumns.push(col));
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

  deleteOwners(deletedOwners: Owner[]) {
    const deletedIds = [];
    deletedOwners.forEach((owner: Owner) => deletedIds.push(`${owner.OWNER_ID}`));
    this.ownerService.deleteOwner(deletedIds).subscribe((result) => console.log(result));
  }

  viewOwners() {
    this.dataSource.loadOwners(this.input.nativeElement.value,
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
  editOwner(selectedOwner: Owner) {
    this.router.navigate([`/manage/owner/${selectedOwner.OWNER_ID}`]);
  }

  deleteOwner(deletedVehicles: Owner[]) {

  }

}
