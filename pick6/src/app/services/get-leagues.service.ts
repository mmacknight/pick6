import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { League } from '../league';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class GetLeaguesService {

   _url = 'http://localhost:8080/api/getleagues';

  constructor(private _http: HttpClient) {
  }

  getLeagues(userid: String) {
     console.log(JSON.stringify({"_id": userid}));
     return this._http.post<any>(this._url, {"_id": userid}).pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || "Server Error");
  }

}
