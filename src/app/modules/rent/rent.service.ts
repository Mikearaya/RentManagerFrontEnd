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

  prepareRequestBody(currentOwner: Rent): URLSearchParams {
    const requestBody = new URLSearchParams();
          requestBody.set('RENT_ID', `${currentOwner.RENT_ID}`);
          requestBody.set('VEHICLE_ID', `${currentOwner.VEHICLE_ID}`);
          requestBody.set('start_date', `${currentOwner.start_date}`);
          requestBody.set('return_date', `${currentOwner.return_date}`);
          requestBody.set('initial_payment', `${currentOwner.initial_payment}`);
          requestBody.set('owner_renting_price', `${currentOwner.owner_renting_price}`);
          requestBody.set('rented_price', `${currentOwner.rented_price}`);
          requestBody.set('customer[CUSTOMER_ID]', `${currentOwner.customer.CUSTOMER_ID}`);
          requestBody.set('customer[first_name]', `${currentOwner.customer.first_name}`);
          requestBody.set('customer[last_name]', `${currentOwner.customer.last_name}`);
          requestBody.set('customer[id_type]', `${currentOwner.customer.id_type}`);
          requestBody.set('customer[id_number]', `${currentOwner.customer.id_number}`);
          requestBody.set('customer[nationality]', `${currentOwner.customer.nationality}`);
          requestBody.set('customer[country]', `${currentOwner.customer.country}`);
          requestBody.set('customer[city]', `${currentOwner.customer.city}`);
          requestBody.set('customer[house_no]', `${currentOwner.customer.house_no}`);
          requestBody.set('customer[mobile_number]', `${currentOwner.customer.mobile_number}`);
          requestBody.set('customer[other_phone]', `${currentOwner.customer.other_phone}`);
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
}

export class Customer {
  CUSTOMER_ID?: number;
  first_name: string;
  last_name: string;
  id_type: string;
  id_number: string;
  nationality: string;
  country: string;
  city: string;
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
}
