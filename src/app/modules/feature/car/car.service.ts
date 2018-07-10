import { Observable, ErrorObserver } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { VehicleDataModel } from './car-list/car-list-datasource';
import { ApiError } from '../../core/api-error';




export class Car {
  VEHICLE_ID?: number;
  OWNER_ID?: number;
  make: string;
  model: string;
  year_made: string;
  color: string;
  type: string;
  chassis_number: string;
  motor_number: string;
  fuiel_type: string;
  cc: number;
  total_passanger: number;
  cylinder_count: number;
  libre_no: string;
  plate_code: number;
  plate_number: string;
}


@Injectable()
export class CarService {
  private url = 'http://localhost/rent_manager/index.php/vehicle';
  private httpBody: URLSearchParams;

  constructor(private httpClient: HttpClient) {
      this.httpBody = new URLSearchParams();
   }

    getCar(id: number): Observable<Car| ApiError> {
          return this.httpClient.get<Car>(`${this.url}/${id}`);
    }

    getAllCars(): Observable<Car[]> {
        return this.httpClient.get<Car[]>(`${this.url}`);
    }

    getAvailableVehicles(): Observable<Car[]> {
      return this.httpClient.get<Car[]>(`${this.url}/available`);
    }

    saveCar(newCar: Car): Observable<Boolean> {
        this.httpBody = this.prepareRequestBody(newCar);
      return this.httpClient.post<Boolean>(`${this.url}`, this.httpBody.toString() );
    }

    updateCar(oldCar: Car): Observable<Boolean> {
            this.httpBody = this.prepareRequestBody(oldCar);
      return this.httpClient.post<Boolean>(`${this.url}/${oldCar.VEHICLE_ID}`, this.httpBody.toString() );
    }

    deleteCar(carIds: number[]): Observable<Boolean> {
      carIds.forEach((id) => this.httpBody.append('VEHICLE_ID', `${id}` ));
      return this.httpClient.post<Boolean>(`${this.url}/delete`, this.httpBody.toString());
    }
    displayVehicles(ownerId: number, filter = '', sortOrder = 'asc', sortColumn = '',
                       pageNumber = 0, pageSize = 3): Observable<VehicleDataModel> {
      return this.httpClient.get(`${this.url}/filter`, {
        params: new HttpParams()
                .set('owner_id', ownerId.toString())
                .set('filter', filter)
                .set('sortOrder', sortOrder)
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
                .set('sortColumn', sortColumn)

      }).pipe(
        map((cars: VehicleDataModel) => cars)
      );
    }

    totalVehicles(): Observable<number> {
      return this.httpClient.get<number>(`${this.url}`);
    }
    prepareRequestBody(currentCar: Car): URLSearchParams {
      const requestBody = new URLSearchParams();
          for (const key in currentCar) {
            if (currentCar.hasOwnProperty(key)) {
              const value = currentCar[key];
              if (value instanceof Object === false ) {
              requestBody.set(key, value);
              }
            }
          }

      return requestBody;

    }

}

