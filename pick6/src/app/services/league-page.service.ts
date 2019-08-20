import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { League } from '../league';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class LeaguePageService {

   _url = 'http://localhost:8080/api/leaguepage';

  constructor(private _http: HttpClient) {
  }

  getLeaguePage(leagueid: String) {
     console.log(JSON.stringify({"_id": leagueid}));
     return this._http.post<any>(this._url, {"_id": leagueid}).pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || "Server Error");
  }

}
