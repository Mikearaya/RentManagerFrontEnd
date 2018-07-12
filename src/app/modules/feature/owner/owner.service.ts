import { OwnerDataModel } from './owner-list/owner-list-datasource';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';



export class Owner {
  OWNER_ID?: number;
  first_name: string;
  last_name: string;
  mobile_number: string;
  city: string;
  sub_city: string;
  wereda: string;
  house_number: string;
}


@Injectable()
export class OwnerService {
  private url = 'http://localhost/rent_manager/index.php/partner';
  private httpBody: URLSearchParams;

  constructor(private httpClient: HttpClient) {
    this.httpBody = new URLSearchParams();
   }


   getOwner(id: number): Observable<Owner> {
      return this.httpClient.get<Owner>(`${this.url}/${id}`);
   }

   getAllOwners(): Observable<Owner[]> {
      return this.httpClient.get<Owner[]>(`${this.url}`);
  }

  saveOwner(newOwner: Owner): Observable<Owner> {
      this.httpBody = this.prepareRequestBody(newOwner);
    return this.httpClient.post<Owner>(`${this.url}`, this.httpBody.toString() );
  }

  updateOwner(oldOwner: Owner): Observable<Owner> {
          this.httpBody = this.prepareRequestBody(oldOwner);
    return this.httpClient.post<Owner>(`${this.url}/${oldOwner.OWNER_ID}`, this.httpBody.toString());
  }

  deleteOwner(OwnerIds: number[]): Observable<Boolean> {
    OwnerIds.forEach((id) => this.httpBody.append('id[]', `${id}` ));
    return this.httpClient.post<Boolean>(`${this.url}/delete`, this.httpBody.toString());
  }

  prepareRequestBody(currentOwner: Owner): URLSearchParams {
    const requestBody = new URLSearchParams();
          for (const key in currentOwner) {
            if (currentOwner.hasOwnProperty(key)) {
              const value = currentOwner[key];
              if (value instanceof Object === false ) {
              requestBody.set(key, value);
              }
            }
          }
    return requestBody;
  }

    displayOwners(filter = '', pageIndex = 0, pageSize = 5, sortOrder = 'asc', sortColumn = ''): Observable<OwnerDataModel> {
      return this.httpClient.get<OwnerDataModel>(`${this.url}`,
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
