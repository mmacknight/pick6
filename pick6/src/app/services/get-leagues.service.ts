import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { League } from '../models/league';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})

export class GetLeaguesService {

   _url = environment.server+'/api/getleagues';

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
