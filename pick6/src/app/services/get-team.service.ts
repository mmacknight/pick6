import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Team } from '../models/team';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})

export class GetTeamService {

   _url = environment.server+'/api/team';

  constructor(private _http: HttpClient) {
  }

  getTeam(league_id, user_id) {
     return this._http.post<any>(this._url,{'league_id': league_id, 'user_id': user_id}).pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || "Server Error");
  }

}
