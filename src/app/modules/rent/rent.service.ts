import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RentModule } from './rent.module';

@Injectable()
export class RentService {
  private url = 'http://localhost/rent_manager/index.php/partner';
  private httpBody: URLSearchParams;
  private header: HttpHeaders;


  constructor(private httpClient: HttpClient) { }

  getRent(rentId: number = 0): Observable<Rent[]> {
      if (rentId === 0) {
        return this.httpClient.get<Rent[]>(`${this.url}`);
      } else {
        return this.httpClient.get<Rent[]>(`${this.url}/${rentId}`);
      }
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
