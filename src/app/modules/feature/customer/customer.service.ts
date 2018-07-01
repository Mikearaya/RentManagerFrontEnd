import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() { }
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
