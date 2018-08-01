import { CarService, Car } from './../car.service';
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import {  VehicleDataSource } from './car-list-datasource';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';
import { FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

const initialSelection = [];
const allowMultiSelect = true;

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit, AfterViewInit {
  car: Car;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  dataSource: VehicleDataSource;
  selection: SelectionModel<Car>;
  selectedColumns: FormControl;
  title = '';
  private ownerId: number;
  private selfContained: Boolean = false;
private currentCatagory = '';


  vehicleColumns = [{key: 'make', humanReadable : 'Make'},
                    {key: 'model', humanReadable : 'Model'},
                    {key: 'color', humanReadable : 'Color'},
                    {key: 'type', humanReadable : 'Type'},
                    {key: 'fuiel_type', humanReadable : 'Fuiel Type'},
                    {key: 'transmission', humanReadable : 'Gear'},
                    {key: 'plate_number', humanReadable : 'Plate Number'},
                    {key: 'cc', humanReadable : 'C.C.'},
                    {key: 'total_passanger', humanReadable : 'Passanger Capacity'}
                  ];
  displayedColumns = ['select', 'make', 'model', 'color',  'type', 'fuiel_type', 'plate_number', 'transmission',
                        'cc', 'total_passanger'];
    constructor(private activatedRoute: ActivatedRoute,
                private carService: CarService,
                private router: Router) {
                  this.selectedColumns = new FormControl(this.displayedColumns);
                  this.currentCatagory = 'all';
                }
  ngOnInit() {
    this.title = this.activatedRoute.snapshot.data['title'];
    this.selfContained = this.activatedRoute.snapshot.data['selfContained'];
    this.ownerId = + this.activatedRoute.snapshot.paramMap.get('ownerId');
    this.dataSource = new VehicleDataSource(this.carService);
    this.dataSource.loadVehicles(this.ownerId);
    this.selection = new SelectionModel<Car>(allowMultiSelect, initialSelection);
  }
  ngAfterViewInit() {

    fromEvent(this.input.nativeElement, 'keyup')
    .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
            this.paginator.pageIndex = 0;
            this.viewVehicles();
        })
    )
.subscribe();
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
        .pipe(
            tap(() => this.viewVehicles())
        )
        .subscribe();
}

manageView(filteredColumns) {
  this.displayedColumns = ['select'];
  filteredColumns.forEach((col) => this.displayedColumns.push(col));
 }


    viewVehicles() {
                this.selection.clear();
          this.dataSource.loadVehicles(
            this.ownerId,
            this.currentCatagory,
            this.input.nativeElement.value,
            this.sort.direction,
            this.sort.active,
            this.paginator.pageIndex,
            this.paginator.pageSize
    );
  }
isSelfContained() {
  return this.selfContained;
}

currentView(data) {
  this.currentCatagory = data;
  this.viewVehicles();
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
  editVehicle(selectedVehicle: Car) {
    this.router.navigate([`update/vehicle/${selectedVehicle.VEHICLE_ID}`]);
  }

  deleteVehicles(deletedVehicles: Car[]) {
    const deletedId = [];
    deletedVehicles.forEach((car) => deletedId.push(`${car.VEHICLE_ID}`));
    this.carService.deleteCar(deletedId)
                                    .subscribe((result: Boolean) => this.viewVehicles(),
                                                (error: HttpErrorResponse) => console.log(error) );
  }

  rentVehicle(selectedVehicle: Car) {
    this.router.navigate([`rent/vehicle/${selectedVehicle.VEHICLE_ID}`]);
  }
}
