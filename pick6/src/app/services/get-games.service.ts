import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})

export class GetGamesService {

   _url = environment.server+'/api/games';

  constructor(private _http: HttpClient) {
  }

  get_games() {
     return this._http.get<any>(this._url).pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || "Server Error");
  }

}
