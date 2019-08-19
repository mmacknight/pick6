import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { League } from '../league';
import { User } from '../user';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddTeamService {

  _url = 'http://localhost:8080/api/addteam';
  constructor(private _http: HttpClient) { }

  add(username: String, league: League) {

     return this._http.post<any>(this._url, {"username": username, "league": league}).pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || "Server Error");
  }
}
