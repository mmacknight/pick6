import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { League } from '../models/league';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})

export class DeleteLeagueService {

   _url = environment.server+'/api/deleteleague';

  constructor(private _http: HttpClient) {
  }

  deleteLeague(leagueid: String) {
     return this._http.post<any>(this._url, {"league_id": leagueid}).pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || "Server Error");
  }

}
