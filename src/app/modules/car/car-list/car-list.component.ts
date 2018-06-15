import { CarService, Car } from './../car.service';
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import {  VehicleDataSource } from './car-list-datasource';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';

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



  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'VEHICLE_ID', 'make'];
    constructor(private activatedRoute: ActivatedRoute,
                private carService: CarService) {

                }
  ngOnInit() {
    this.car = this.activatedRoute.snapshot.data['owenerId'];
    this.dataSource = new VehicleDataSource(this.carService);
    this.dataSource.loadVehicles(1);
    this.selection = new SelectionModel<Car>(allowMultiSelect, initialSelection);
  }
  ngAfterViewInit() {

    fromEvent(this.input.nativeElement, 'keyup')
    .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
            this.paginator.pageIndex = 0;
            this.displayVehicles();
        })
    )
.subscribe();
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
        .pipe(
            tap(() => this.displayVehicles())
        )
        .subscribe();
}
  deleteCar(deletedCars: Car[]) {
    const deletedId = [];
    deletedCars.forEach((car) => deletedId.push(`${car.CAR_ID}`));
    this.carService.deleteCar(deletedId).subscribe((result) => console.log(result));
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  displayVehicles() {
    this.dataSource.loadVehicles(
      0,
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
