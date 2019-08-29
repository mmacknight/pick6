import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { League } from '../models/league';
import { User } from '../models/user';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddTeamService {

  _url = environment.server+'/api/addteam';
  constructor(private _http: HttpClient) { }

  add(username: String, league: League) {

     return this._http.post<any>(this._url, {"username": username, "league": league}).pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || "Server Error");
  }
}
