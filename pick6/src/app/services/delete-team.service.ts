import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})

export class DeleteTeamService {

   _url = environment.server+'/api/deleteTeam';

  constructor(private _http: HttpClient) {
  }

  deleteTeam(teamid: String) {
     return this._http.post<any>(this._url, {"team_id": teamid}).pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || "Server Error");
  }

}
