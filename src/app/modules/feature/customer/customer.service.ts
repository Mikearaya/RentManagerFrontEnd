import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomerService {
  private url = 'http://localhost/rent_manager/index.php/customer';
  private httpBody: URLSearchParams;
  constructor(private httpClient: HttpClient) {
    this.httpBody = new URLSearchParams();
   }

  getCustomerById(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(`${this.url}/${id}`);
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(`${this.url}`);
  }

  addCustomer(newCustomer: Customer): Observable<Customer> {
    this.httpBody = this.prepareRequestBody(newCustomer);
    return this.httpClient.post<Customer>(`${this.url}/add`, this.httpBody.toString());
  }
  updateCustomer(updatedCustomer: Customer): Observable<Boolean> {
    this.httpBody = this.prepareRequestBody(updatedCustomer);
    return this.httpClient.post<Boolean>(`${this.url}/update/${updatedCustomer.CUSTOMER_ID}`, this.httpBody.toString());
  }

  deleteCustomer(customerId: number): Observable<Boolean> {
    return this.httpClient.delete<Boolean>(`${this.url}/${customerId}`);
  }

  private prepareRequestBody(customer: Customer): URLSearchParams {
    const dataModel = new URLSearchParams();
    for (const key in customer) {
      if (customer.hasOwnProperty(key)) {
        const value = customer[key];
        dataModel.set(key, value );
      }
    }
    return dataModel;
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
}


