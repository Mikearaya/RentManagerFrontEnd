import { CarService, Car } from './../car.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { CarListDataSource } from './car-list-datasource';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: CarListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];
    constructor(private router: Router,
                private carService: CarService) {

                }
  ngOnInit() {
    this.dataSource = new CarListDataSource(this.paginator, this.sort);
  }

  deleteCar(deletedCars: Car[]) {
    const deletedId = [];
    deletedCars.forEach((car) => deletedId.push(`${car.CAR_ID}`));
    this.carService.deleteCar(deletedId).subscribe((result) => console.log(result));
  }
}
