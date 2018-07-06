import { CarService, Car } from './../car.service';
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import {  VehicleDataSource } from './car-list-datasource';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';
import { FormControl } from '@angular/forms';

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
  private selfContained: Boolean = false;



  vehicleColumns = [{key: 'make', humanReadable : 'Make'},
                    {key: 'model', humanReadable : 'Model'},
                    {key: 'color', humanReadable : 'Color'},
                    {key: 'type', humanReadable : 'Type'},
                    {key: 'fuiel_type', humanReadable : 'Fuiel Type'},
                    {key: 'plate_number', humanReadable : 'Plate Number'},
                    {key: 'cc', humanReadable : 'C.C.'},
                    {key: 'total_passanger', humanReadable : 'Passanger Capacity'}
                  ];
  displayedColumns = ['select', 'make', 'model', 'color',  'type', 'fuiel_type', 'plate_number',
                        'cc', 'total_passanger'];
    constructor(private activatedRoute: ActivatedRoute,
                private carService: CarService,
                private router: Router) {
                  this.selectedColumns = new FormControl(this.displayedColumns);
                }
  ngOnInit() {
    this.title = this.activatedRoute.snapshot.data['title'];
    this.selfContained = this.activatedRoute.snapshot.data['selfContained'];
    this.dataSource = new VehicleDataSource(this.carService);
    this.dataSource.loadVehicles();
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
  deleteCar(deletedCars: Car[]) {
    const deletedId = [];
    deletedCars.forEach((car) => deletedId.push(`${car.VEHICLE_ID}`));
    this.carService.deleteCar(deletedId).subscribe((result) => console.log(result));
  }

    viewVehicles() {
      this.selection.clear();
    this.dataSource.loadVehicles(
      0,
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

  }

  rentVehicle(selectedVehicle: Car) {
    this.router.navigate([`rent/vehicle/${selectedVehicle.VEHICLE_ID}`]);
  }
}
