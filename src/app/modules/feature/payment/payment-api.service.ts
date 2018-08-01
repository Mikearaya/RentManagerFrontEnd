import { HttpClient, HttpParams } from '@angular/common/http';
import { PaymentDataModel } from './payment-view/payment-view-datasource';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class PaymentApiService {
  private url = 'http://localhost/rent_manager/index.php/payment';
  private httpBody: URLSearchParams;

  constructor(private httpClient: HttpClient) {
    this.httpBody = new URLSearchParams();
  }

    addPayment(newPayment: Payment): Observable<Payment> {
      this.httpBody = this.prepareDataModel(newPayment);
      return this.httpClient.post<Payment>(`${this.url}/`, this.httpBody.toString());
    }

  displayPayments(filter = '', pageIndex = 0, pageSize = 5, sortOrder = 'desc', sortColumn = ''): Observable<PaymentDataModel> {
    return this.httpClient.get<PaymentDataModel>(`${this.url}`,
                                          {params : new HttpParams()
                                                        .set('filter', filter)
                                                        .set('pageIndex', pageIndex.toString() )
                                                        .set('pageSize', pageSize.toString())
                                                        .set('sortOrder', sortOrder)
                                                        .set('sortColumn', sortColumn)
                                                      }
                                                    );
  }

  private prepareDataModel(payment: Payment): URLSearchParams {
    const dataModel = new URLSearchParams();

    for (const key in payment) {
      if (payment.hasOwnProperty(key)) {
        const value = payment[key];
        dataModel.set(key, value);
      }
    }

    return dataModel;
  }

}


export class Payment {
  PAYMENT_ID?: number;
  RENT_ID: number;
  payment_amount: number;
}
export class PaymentView {
  RENT_ID: number;
  PAYMENT_ID: number;
  total_amount: number;
  paid_amount: number;
  remaining_amount: number;
  total_days: number;
  start_date: string;
  return_date: string;
  place_code: string;
  plate_number: string;
  rented_by: string;

}



