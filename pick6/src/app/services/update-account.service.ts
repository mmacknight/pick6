import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateAccountService {
   _url = environment.server+'/api/update';
   constructor(private _http: HttpClient) { }

   update(user: User) {
      user.authdata = '';
      return this._http.post<any>(this._url, user).pipe(catchError(this.errorHandler));
   }
   errorHandler(error: HttpErrorResponse) {
     return observableThrowError(error.message || "Server Error");
   }
 }
