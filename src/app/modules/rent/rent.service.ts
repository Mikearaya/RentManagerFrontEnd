import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RentService {
  private url = 'http://localhost/rent_manager/index.php/rent';
  private httpBody: URLSearchParams;
  private header: HttpHeaders;


  constructor(private httpClient: HttpClient) {
    this.header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      this.httpBody = new URLSearchParams();
  }

  getRent(rentId: number = 0): Observable<Rent[]> {
      if (rentId === 0) {
        return this.httpClient.get<Rent[]>(`${this.url}`);
      } else {
        return this.httpClient.get<Rent[]>(`${this.url}/${rentId}`);
      }
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
          requestBody.set('start_date', `${currentOwner.start_date}`);
          requestBody.set('return_date', `${currentOwner.return_date}`);
          requestBody.set('initial_payment', `${currentOwner.initial_payment}`);
          requestBody.set('owner_renting_price', `${currentOwner.owner_renting_price}`);
          requestBody.set('rented_price', `${currentOwner.rented_price}`);
          requestBody.set('customer', `${currentOwner.customer}`);
    return requestBody;

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
