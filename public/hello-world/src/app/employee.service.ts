import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

   private _url: string = "../assets/data/employee.json"

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]>   {
     return this.http.get<Employee[]>(this._url).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
     return observableThrowError(error.message || "Server Error");
 }
}
