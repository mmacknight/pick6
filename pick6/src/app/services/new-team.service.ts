import { Injectable } from '@angular/core';
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class NewTeamService {
   // _id = '';
   // userid = '';
   // leagueid = '';
   // role = '';
   // team0 = '';
   // team1 = '';
   // team2 = '';
   // team3 = '';
   // team4 = '';
   // team5 = '';

  constructor() { }

  newTeam(
     _id: string = '',
     userid: string = '',
     leagueid: string = '',
     role: string = '',
     team0: string = '',
     team1: string = '',
     team2: string = '',
     team3: string = '',
     team4: string = '',
     team5: string = ''
  ) {
     // if (_id) {
     //     this._id = _id;
     // }
     // if (userid) {
     //    this.userid = userid;
     // }
     // if (leagueid) {
     //    this.leagueid = leagueid;
     // }
     // if (role) {
     //    this.role = role;
     // }
     // if (team0) {
     //    this.team0 = team0;
     // }
     // if (team1) {
     //   this.team1 = team1;
     // }
     // if (!team2) {
     //   this.team2 = team2;
     // }
     // if (!team3) {
     //   this.team3 = team3;
     // }
     // if (!team4) {
     //   this.team4 = team4;
     // }
     // if (!team5) {
     //   this.team5 = team5;
     // }

     return new Team(_id,userid,leagueid,role,team0,team1,team2,team3,team4,team5);
 }
}
