import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';



export class Owner {
  OWNER_ID?: number;
  first_name: string;
  last_name: string;
  mobile_number: string;
  other_phones: {};
  city: string;
  sub_city: string;
  wereda: string;
}


@Injectable()
export class OwnerService {
  private url = 'http://localhost/rent_manager/index.php/partner';
  private httpBody: URLSearchParams;
  private header: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.header = new HttpHeaders()
                  .set('Content-Type', 'application/x-www-form-urlencoded');
    this.httpBody = new URLSearchParams();
   }
   getOwner(id: number = 0): Observable<Owner[]> {
    if (id) {
      return this.httpClient.get<Owner[]>(`${this.url}/${id}`);
    } else {
      return this.httpClient.get<Owner[]>(`${this.url}`);
    }
  }

  saveOwner(newOwner: Owner): Observable<Boolean> {
    const requestOption =  { 'headers' : this.header  };
      this.httpBody = this.prepareRequestBody(newOwner);
    return this.httpClient.post<Boolean>(`${this.url}`, this.httpBody.toString(), requestOption );
  }

  updateOwner(oldOwner: Owner): Observable<Boolean> {
    const requestOption =  { 'headers' : this.header  };
          this.httpBody = this.prepareRequestBody(oldOwner);
    return this.httpClient.post<Boolean>(`${this.url}/${oldOwner.OWNER_ID}`, this.httpBody.toString(), requestOption );
  }

  deleteOwner(OwnerIds: number[]): Observable<Boolean> {
    const requestOption =  { 'headers' : this.header  };
    OwnerIds.forEach((id) => this.httpBody.append('OWNER_ID', `${id}` ));
    return this.httpClient.post<Boolean>(`${this.url}/delete`, this.httpBody.toString(), requestOption);
  }

  prepareRequestBody(currentOwner: Owner): URLSearchParams {
    const requestBody = new URLSearchParams();
          requestBody.set('OWNER_ID', `${currentOwner.OWNER_ID}`);
          requestBody.set('first_name', `${currentOwner.first_name}`);
          requestBody.set('last_name', `${currentOwner.last_name}`);
          requestBody.set('mobile_number', `${currentOwner.mobile_number}`);
          requestBody.set('city', `${currentOwner.city}`);
          requestBody.set('sub_city', `${currentOwner.sub_city}`);
          requestBody.set('wereda', `${currentOwner.wereda}`);
    return requestBody;

  }

    displayOwners(filter = '', pageIndex = 0, pageSize = 3, sortOrder = 'asc', sortColumn = ''): Observable<Owner[]> {
      return this.httpClient.get<Owner[]>(`${this.url}`,
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
