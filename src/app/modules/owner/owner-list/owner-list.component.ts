import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { OwnerService, Owner } from './../owner.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { OwnerDataSource } from './owner-list-datasource';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, merge } from 'rxjs';

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

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['OWNER_ID', 'first_name', 'last_name', 'mobile_number', 'city', 'sub_city', 'wereda'];

  constructor(private activatedRoute: ActivatedRoute,
               private ownerService: OwnerService) {

  }

  ngOnInit() {
    this.dataSource = new OwnerDataSource(this.ownerService);
    this.owner = this.activatedRoute.snapshot.data['owner'];
    this.dataSource.loadOwners();
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
}
