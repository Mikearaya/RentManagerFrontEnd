import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { VehicleDataModel } from './car-list/car-list-datasource';




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
  private header: HttpHeaders;

  constructor(private httpClient: HttpClient) {
      this.header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      this.httpBody = new URLSearchParams();
   }

    getCar(id: number): Observable<Car> {
          return this.httpClient.get<Car>(`${this.url}/${id}`);
    }

    getAllCars(): Observable<Car[]> {
        return this.httpClient.get<Car[]>(`${this.url}`);
    }

    saveCar(newCar: Car): Observable<Boolean> {
      const requestOption =  { 'headers' : this.header  };
        this.httpBody = this.prepareRequestBody(newCar);
      return this.httpClient.post<Boolean>(`${this.url}`, this.httpBody.toString(), requestOption );
    }

    updateCar(oldCar: Car): Observable<Boolean> {
      const requestOption =  { 'headers' : this.header  };
            this.httpBody = this.prepareRequestBody(oldCar);
      return this.httpClient.post<Boolean>(`${this.url}/${oldCar.VEHICLE_ID}`, this.httpBody.toString(), requestOption );
    }

    deleteCar(carIds: number[]): Observable<Boolean> {
      const requestOption =  { 'headers' : this.header  };
      carIds.forEach((id) => this.httpBody.append('VEHICLE_ID', `${id}` ));
      return this.httpClient.post<Boolean>(`${this.url}/delete`, this.httpBody.toString(), requestOption);
    }
    displayVehicles(id: number, filter = '', sortOrder = 'asc', sortColumn = '',
                       pageNumber = 0, pageSize = 3): Observable<VehicleDataModel> {
      return this.httpClient.get(`${this.url}/filter`, {
        params: new HttpParams()
                .set('VEHICLE_ID', id.toString())
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
            requestBody.set('VEHICLE_ID', `${currentCar.VEHICLE_ID}`);
            requestBody.set('OWNER_ID', `${currentCar.OWNER_ID}`);
            requestBody.set('make', `${currentCar.make}`);
            requestBody.set('model', `${currentCar.model}`);
            requestBody.set('year_made', `${currentCar.year_made}`);
            requestBody.set('color', `${currentCar.color}`);
            requestBody.set('type', `${currentCar.type}`);
            requestBody.set('chassis_number', `${currentCar.chassis_number}`);
            requestBody.set('motor_number', `${currentCar.motor_number}`);
            requestBody.set('fuiel_type', `${currentCar.fuiel_type}`);
            requestBody.set('cc', `${currentCar.cc}`);
            requestBody.set('total_passanger', `${currentCar.total_passanger}`);
            requestBody.set('cylinder_count', `${currentCar.cylinder_count}`);
            requestBody.set('libre_no', `${currentCar.libre_no}`);
            requestBody.set('plate_code', `${currentCar.plate_code}`);
            requestBody.set('plate_number', `${currentCar.plate_number}`);
      return requestBody;

    }

}

