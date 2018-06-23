import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RentDataModel } from './rent-view/rent-view-datasource';

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
    const requestOption =  { 'headers' : this.header  };
      this.httpBody = this.prepareRequestBody(newRent);
    return this.httpClient.post<Rent>(`${this.url}`, this.httpBody.toString(), requestOption );
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
          requestBody.set('RENT_ID', `${currentRent.RENT_ID}`);
          requestBody.set('VEHICLE_ID', `${currentRent.VEHICLE_ID}`);
          requestBody.set('start_date', rentStart ) ,
          requestBody.set('return_date', rentEnd ),
          requestBody.set('initial_payment', `${currentRent.initial_payment}`);
          requestBody.set('owner_renting_price', `${currentRent.owner_renting_price}`);
          requestBody.set('rented_price', `${currentRent.rented_price}`);
          requestBody.set('customer[CUSTOMER_ID]', `${currentRent.customer.CUSTOMER_ID}`);
          requestBody.set('customer[first_name]', `${currentRent.customer.first_name}`);
          requestBody.set('customer[last_name]', `${currentRent.customer.last_name}`);
          requestBody.set('customer[driving_licence_id]', `${currentRent.customer.driving_licence_id}`);
          requestBody.set('customer[passport_number]', `${currentRent.customer.passport_number}`);
          requestBody.set('customer[nationality]', `${currentRent.customer.nationality}`);
          requestBody.set('customer[country]', `${currentRent.customer.country}`);
          requestBody.set('customer[city]', `${currentRent.customer.city}`);
          requestBody.set('customer[house_no]', `${currentRent.customer.house_no}`);
          requestBody.set('customer[mobile_number]', `${currentRent.customer.mobile_number}`);
          requestBody.set('customer[other_phone]', `${currentRent.customer.other_phone}`);
          requestBody.set('condition[window_controller]', `${currentRent.condition.window_controller}`);
          requestBody.set('condition[wiper]', `${currentRent.condition.wiper}`);
          requestBody.set('condition[seat_belt]', `${currentRent.condition.seat_belt}`);
          requestBody.set('condition[spare_tire]', `${currentRent.condition.spare_tire}`);
          requestBody.set('condition[crick_wrench]', `${currentRent.condition.crick_wrench}`);
          requestBody.set('condition[dashboard_close]', `${currentRent.condition.dashboard_close}`);
          requestBody.set('condition[mude_protecter]', `${currentRent.condition.mude_protecter}`);
          requestBody.set('condition[spokio_outer]', `${currentRent.condition.spokio_outer}`);
          requestBody.set('condition[spokio_inner]', `${currentRent.condition.spokio_inner}`);
          requestBody.set('condition[sun_visor]', `${currentRent.condition.sub_visor}`);
          requestBody.set('condition[mat_inner]', `${currentRent.condition.mat_inner}`);
          requestBody.set('condition[wind_protecter]', `${currentRent.condition.wind_protector}`);
          requestBody.set('condition[blinker]', `${currentRent.condition.blinker}`);
          requestBody.set('condition[radio]', `${currentRent.condition.radio}`);
          requestBody.set('condition[fuiel_level]', `${currentRent.condition.fuiel_level}`);
          requestBody.set('condition[cigaret_lighter]', `${currentRent.condition.cigaret_lighter}`);
          requestBody.set('condition[fuiel_lid]', `${currentRent.condition.fuiel_lid}`);
          requestBody.set('condition[crick]', `${currentRent.condition.crick}`);
          requestBody.set('condition[radiator_lid]', `${currentRent.condition.radiator_lid}`);
          requestBody.set('condition[comment]', `${currentRent.condition.comment}`);

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

  private formatDate(date: Date): string {
      const day = date.getUTCDate();
      const month = date.getUTCMonth() + 1;
      const year = date.getFullYear();

    return  `${year}-${month}-${day}`;
  }
}

export class Customer {
  CUSTOMER_ID?: number;
  first_name: string;
  last_name: string;
  driving_licence_id: string;
  passport_number?: string;
  nationality: string;
  country: string;
  city: string;
  hotel_name?: string;
  hotel_phone?: string;
  house_no: string;
  mobile_number: string;
  other_phone: string;
  registered_on?: string;
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
  customer: Customer;
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
sub_visor: number;
mat_inner: number;
wind_protector: number;
blinker: number;
radio: string;
fuiel_level: string;
fuiel_lid: number;
cigaret_lighter: number;
radiator_lid: number;
crick: number;
comment: number;

}
