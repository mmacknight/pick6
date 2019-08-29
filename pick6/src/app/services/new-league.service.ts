import { Injectable } from '@angular/core';
import { League } from '../models/league';

@Injectable({
  providedIn: 'root'
})
export class NewLeagueService {

   // _id = '';
   // name = '';
   // admin = '';
   // numteams = '';
   // teams = [];


  constructor() {
  }

  newLeague(_id: string = '', name: string = '', admin: string = '', teams: string[] = []) {
     // if (_id) {
     //   this._id = _id;
     // }
     // if (name) {
     //  this.name = name;
     // }
     // if (admin) {
     //  this.admin = admin;
     // }
     // if (numteams) {
     //  this.numteams = numteams;
     // }
     // if (teams) {
     //  this.teams = teams;
     // }
     // return new League(this._id,this.name,this.admin,this.numteams,this.teams);
     return new League(_id,name,admin,teams);
 }

}
