import { ActivatedRoute, Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { FormControl } from '@angular/forms';
import {fromEvent, merge} from 'rxjs';
import { distinctUntilChanged, debounceTime, tap } from 'rxjs/operators';
import { EmployeeApiService, Employee } from '../employee-api.service';
import { EmployeeView, EmployeeViewDataSource } from './employee-view-datasource';
import { HttpErrorResponse } from '@angular/common/http';

const allowMultiSelect = true;
const initialSelection = [];
@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  selection: SelectionModel<EmployeeView>;
  selectedColumns: FormControl;
  dataSource: EmployeeViewDataSource;
  private selfContained: Boolean = false;

  constructor(
              private activatedRoute: ActivatedRoute,
              private employeeApiService: EmployeeApiService,
            private router: Router) {
              this.selectedColumns = new FormControl(this.displayedColumns);
             }

  employeeViewColumns = [
    {key: 'first_name', humanReadable: 'First Name'},
    {key: 'last_name', humanReadable: 'Last Name'},
    {key: 'phone_number', humanReadable: 'Phone'},
    {key: 'country', humanReadable: 'country'},
    {key: 'city', humanReadable: 'city'},
    {key: 'sub_city', humanReadable: 'Sub-City'},
    {key: 'house_number', humanReadable: 'House Number'},
    {key: 'registered_on', humanReadable: 'Registered'},
  ];

  displayedColumns: String[] = ['select', 'first_name', 'last_name', 'phone_number', 'registered_on'];

  ngOnInit() {
    this.selfContained = this.activatedRoute.snapshot.data['selfContained'];
    this.dataSource = new EmployeeViewDataSource(this.employeeApiService);
    this.dataSource.loadEmployees();
    this.selection = new SelectionModel(allowMultiSelect, initialSelection);
  }
  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup').pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => {
        this.paginator.pageIndex = 0 ;
        this.viewEmployees();
      })
    )
    .subscribe();
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page).pipe(
      tap(() => this.viewEmployees())
    )
    .subscribe();
  }

    isSelfContained() {
      return this.selfContained;
    }
  manageView(filteredColumns: String[]) {
    this.displayedColumns = ['select'];
    filteredColumns.forEach((col) => this.displayedColumns.push(col));
 }
  viewEmployees() {
    this.selection.clear();
    this.dataSource.loadEmployees(this.input.nativeElement.value,
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
  editEmployee(selectedEmployee: EmployeeView) {
    this.router.navigate([`/update/employee/${selectedEmployee.EMPLOYEE_ID}`]);
  }

  deleteEmployee(deletedEmployees: EmployeeView[]) {
    const deletedIds = [];
    deletedEmployees.forEach((employee: EmployeeView) =>  deletedIds.push(employee.EMPLOYEE_ID));
    this.employeeApiService.deleteEmployee(deletedIds)
                                          .subscribe(() => this.viewEmployees(),
                                                      (error: HttpErrorResponse) => console.log(error));
  }
}
