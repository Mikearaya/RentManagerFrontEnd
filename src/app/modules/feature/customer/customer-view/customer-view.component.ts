import { ActivatedRoute, Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { CustomerService, Customer } from './../customer.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { CustomerViewDataSource, CustomerView } from './customer-view-datasource';
import { FormControl } from '@angular/forms';
import {fromEvent, merge} from 'rxjs';
import { distinctUntilChanged, debounceTime, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

const allowMultiSelect = true;
const initialSelection = [];
@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  selection: SelectionModel<CustomerView>;
  selectedColumns: FormControl;
  dataSource: CustomerViewDataSource;
  private customerSelfContained: Boolean = false;

  constructor(
              private activatedRoute: ActivatedRoute,
              private customerService: CustomerService,
            private router: Router) {
              this.selectedColumns = new FormControl(this.displayedColumns);
             }

  customerViewColumns = [
    {key: 'first_name', humanReadable: 'First Name'},
    {key: 'last_name', humanReadable: 'Last Name'},
    {key: 'nationality', humanReadable: 'Nationality'},
    {key: 'country', humanReadable: 'country'},
    {key: 'city', humanReadable: 'city'},
    {key: 'house_no', humanReadable: 'House Number'},
    {key: 'driving_licence_id', humanReadable: 'Driving Licence ID'},
    {key: 'passport_number', humanReadable: 'Passport Number'},
    {key: 'hotel_name', humanReadable: 'Hotel Name'},
    {key: 'hotel_phone', humanReadable: 'Hotel Phone'},
    {key: 'mobile_number', humanReadable: 'Mobile'},
    {key: 'other_phone', humanReadable: 'Other Phone'},
    {key: 'registered_on', humanReadable: 'Registered'},
  ];

  displayedColumns: String[] = ['select', 'first_name', 'last_name', 'mobile_number', 'driving_licence_id', 'registered_on'];

  ngOnInit() {
    this.customerSelfContained = this.activatedRoute.snapshot.data['customerSelfContained'];
    this.dataSource = new CustomerViewDataSource(this.customerService);
    this.dataSource.loadCustomers();
    this.selection = new SelectionModel(allowMultiSelect, initialSelection);
  }
  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup').pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => {
        this.paginator.pageIndex = 0 ;
        this.viewCustomers();
      })
    )
    .subscribe();
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page).pipe(
      tap(() => this.viewCustomers())
    )
    .subscribe();
  }

  isSelfContained() {
    return this.customerSelfContained;
  }

  manageView(filteredColumns: String[]) {
    this.displayedColumns = ['select'];
    filteredColumns.forEach((col) => this.displayedColumns.push(col));
 }
  viewCustomers() {
    this.selection.clear();
    this.dataSource.loadCustomers(this.input.nativeElement.value,
                              this.sort.active,
                              this.sort.direction,
                              this.paginator.pageIndex,
                              this.paginator.pageSize
                          );
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
  rentVehicle(selectedCustomer: CustomerView) {
    this.router.navigate([`/rent/vehicle/`, {customerId: selectedCustomer.CUSTOMER_ID}]);
  }
  editCustomer(selectedCustomer: CustomerView) {
    this.router.navigate([`/update/customer/${selectedCustomer.CUSTOMER_ID}`]);
  }

  deleteCustomers(deletedCustomers: Customer[]) {

    const deletedIds = [];
    deletedCustomers.forEach((customer: Customer) =>  deletedIds.push(customer.CUSTOMER_ID) );
    this.customerService.deleteCustomer(deletedIds)
                        .subscribe((result: Boolean) => { this.viewCustomers(); } ,
                                    (error: HttpErrorResponse) => console.log(error));
  }
}
