import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DashboardApiService {
  private url = 'http://localhost/rent_manager/index.php/dashboard';
  constructor(private httpClient: HttpClient) { }

  getDashboardNumbers(): Observable<any> {
    return this.httpClient.get(`${this.url}`);
  }

}
