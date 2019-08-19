import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { League } from '../league';
import { User } from '../user';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreateLeague {

  _url = 'http://localhost:8080/api/createleague';
  constructor(private _http: HttpClient) { }

  create(league: League) {
     return this._http.post<any>(this._url, league).pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || "Server Error");
  }
}
