import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class NewUserService {

   // _id = '';
   // first = '';
   // last = '';
   // username = '';
   // email = '';
   // authdata = '';

  constructor() { }

  newUser(_id: string = '', first: string = '', last: string = '', username: string = '', email: string = '', authdata: string = '') {
     // if (_id) {
     //    this._id = _id;
     // }
     // if (first) {
     //    this.first = first;
     // }
     // if (last) {
     //    this.last = last;
     // }
     // if (username) {
     //    this.username = username;
     // }
     // if (email) {
     //    this.email = email;
     // }
     // if (authdata) {
     //   this.authdata = authdata;
     // }
     return new User(_id,first,last,username,email,authdata);
 }
}
