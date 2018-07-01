import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RentDataModel } from './rent-view/rent-view-datasource';
import { Customer } from '../customer/customer.service';

@Injectable()
export class RentService {
  private url = 'http://localhost/rent_manager/index.php/rent';
  private httpBody: URLSearchParams;
  private header: HttpHeaders;


  constructor(private httpClient: HttpClient) {
    this.header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      this.httpBody = new URLSearchParams();
  }

  getRent(rentId: number): Observable<Rent> {
        return this.httpClient.get<Rent>(`${this.url}/${rentId}`);
  }
  getAllRents(): Observable<Rent[]> {
      return this.httpClient.get<Rent[]>(`${this.url}`);
  }
  saveRent(newRent: Rent): Observable<Rent> {
      this.httpBody = this.prepareRequestBody(newRent);
    return this.httpClient.post<Rent>(`${this.url}`, this.httpBody.toString() );
  }

  updateRent(oldRent: Rent): Observable<Boolean> {
    const requestOption =  { 'headers' : this.header  };
          this.httpBody = this.prepareRequestBody(oldRent);
    return this.httpClient.post<Boolean>(`${this.url}/${oldRent.RENT_ID}`, this.httpBody.toString(), requestOption );
  }

  deleteRent(rentIds: number[]): Observable<Boolean> {
    const requestOption =  { 'headers' : this.header  };
    rentIds.forEach((id) => this.httpBody.append('RENT_ID', `${id}` ));
    return this.httpClient.post<Boolean>(`${this.url}/delete`, this.httpBody.toString(), requestOption);
  }

  prepareRequestBody(currentRent: Rent): URLSearchParams {

    const rentStart = this.formatDate(new Date(currentRent.start_date));
    const rentEnd = this.formatDate(new Date(currentRent.return_date));

    const requestBody = new URLSearchParams();

        for (const key in currentRent) {
          if (currentRent.hasOwnProperty(key)) {
            const element = currentRent[key];
            if (element instanceof Object ) {
              for (const key2 in element) {
                if (element.hasOwnProperty(key2)) {
                  const el2 = element[key2];
                  console.log(`element${key} ${key2} value ${el2}`);
                  requestBody.set(`${key}[${key2}]`, el2);
                }
              }
            } else {
              console.log(`hasOwnproperty ${key} value ${element}`);
              requestBody.set(`${key}`, element);
            }
          }
        }

        requestBody.set('start_date', rentStart) ;
          requestBody.set('return_date', rentEnd);
        /*
          for (const key in currentRent.customer) {
            if (currentRent.customer.hasOwnProperty(key)) {
              const element = currentRent.customer[key];
              requestBody.set(`customer[${key}]`, element);
            }
          }

          for (const key in currentRent.condition) {
            if (currentRent.condition.hasOwnProperty(key)) {
              const element = currentRent.condition[key];
              requestBody.set(`condition[${key}]`, element);
            }
          }
      */

    return requestBody;

  }

  displayRents(filter = '', pageIndex = 0, pageSize = 3, sortOrder = 'asc', sortColumn = ''): Observable<RentDataModel> {
    return this.httpClient.get<RentDataModel>(`${this.url}`,
                                          {params : new HttpParams()
                                                        .set('filter', filter)
                                                        .set('pageIndex', pageIndex.toString() )
                                                        .set('pageSize', pageSize.toString())
                                                        .set('sortOrder', sortOrder)
                                                        .set('sortColumn', sortColumn)
                                                      }
                                                    );
  }

  getRentContratData(rentId: number): any {
    return this.httpClient.get<any>(`${this.url}/contrat_info/${rentId}`);
  }
  private formatDate(date: Date): string {
      const day = date.getUTCDate();
      const month = date.getUTCMonth() + 1;
      const year = date.getFullYear();

    return  `${year}-${month}-${day}`;
  }
}

export class Rent {
  RENT_ID?: number;
  CUSTOMER_ID?: number;
  VEHICLE_ID: number;
  start_date: string;
  return_date: string;
  owner_renting_price: number;
  rented_price: number;
  initial_payment: number;
  added_on?: string;
  updated_on?: string;
  customer?: Customer;
  condition?: RentCondition;
}

export class RentCondition {
CONDITION_ID?: number;
RENT_ID?: number;
window_controller: number;
seat_belt: number;
spare_tire: number;
wiper: number;
crick_wrench: number;
dashboard_close: boolean;
mude_protecter: number;
spokio_outer: number;
spokio_inner: number;
sun_visor: number;
mat_inner: number;
wind_protecter: number;
blinker: number;
radio: string;
fuiel_level: string;
fuiel_lid: number;
cigaret_lighter: number;
radiator_lid: number;
crick: number;
comment: number;

}
