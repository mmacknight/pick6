import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
   _url = environment.server+'/api/login';

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(this._url, { username, password })
            .pipe(map(data => {
               console.log(data.success)
               if (data.success) {
                  data.user.authdata = window.btoa(username + ':' + password);
                  localStorage.setItem('currentUser', JSON.stringify(data.user));
                  this.currentUserSubject.next(data.user);
                  return data;
               }
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
