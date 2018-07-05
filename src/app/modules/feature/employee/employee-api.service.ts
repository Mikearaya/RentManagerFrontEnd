import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeViewModel } from './employee-view/employee-view-datasource';


@Injectable({
  providedIn: 'root'
})
export class EmployeeApiService {
    private url = 'http://localhost/rent_manager/index.php/employee';
    private httpBody: URLSearchParams;
  constructor(private httpClient: HttpClient) { }

  getEmployeeById(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.url}/${id}`);
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.url}`);
  }

  addEmployee(newEmployee: Employee): Observable<Employee> {
    this.httpBody = this.prepareRequestBody(newEmployee);
    return this.httpClient.post<Employee>(`${this.url}/add`, this.httpBody.toString());
  }

  updateEmployee(updateEmployee: Employee): Observable<Boolean> {
    this.httpBody = this.prepareRequestBody(updateEmployee);
    return this.httpClient.post<Boolean>(`${this.url}/update/${updateEmployee.EMPLOYEE_ID}`, this.httpBody.toString());
  }

  deleteEmployee(employeeId: number): Observable<Boolean> {
    return this.httpClient.delete<Boolean>(`${this.url}/${employeeId}`);
  }

  private prepareRequestBody(employee: Employee): URLSearchParams {
    const requestBody = new URLSearchParams();

    for (const key in employee) {
        if (employee.hasOwnProperty(key)) {
          const value = employee[key];
          requestBody.set(`${key}`, value);
        }
    }
    return requestBody;

  }

  displayEmployees(filter, sortColumn, sortOrder, pageNumber, pageSize): Observable<EmployeeViewModel> {
   return this.httpClient.get<EmployeeViewModel>(`${this.url}`, {
      params : {
        filter_string: filter,
        sort_column: sortColumn,
        sort_order: sortOrder,
        page_index: pageNumber,
        page_size: pageSize
      }
    });
  }

}


export class Employee {
  EMPLOYEE_ID?: number;
  first_name: string;
  last_name: string;
  city: string;
  sub_city: string;
  wereda: string;
  house_number: string;
  role?: string;
  phone_number: string;
  country: string;
}
