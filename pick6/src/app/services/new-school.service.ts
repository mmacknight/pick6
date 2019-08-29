import { Injectable } from '@angular/core';
import { School } from '../models/school';

@Injectable({
  providedIn: 'root'
})
export class NewSchoolService {

   // _id = '';
   // school = '';
   // mascot = '';
   // conference = '';
   // division = '';
   // wins = 0;
   // primary_color = '';
   // secondary_color = '';

  constructor() { }

  newSchool(
        _id: string = '',
        school: string = '',
        mascot: string = '',
        team_name: string = '',
        conference: string = '',
        division: string = '',
        wins: number = 0,
        primary_color: string = '',
        secondary_color: string = ''
  )  {
     // if (_id) {
     //     this._id = _id;
     // }
     // if (school) {
     //   this.school = school;
     // }
     // if (mascot) {
     //   this.mascot = mascot;
     // }
     // if (conference) {
     //   this.conference = conference;
     // }
     // if (division) {
     //   this.division = division;
     // }
     // if (wins) {
     //    this.wins = wins;
     // }
     // if (primary_color) {
     //    this.primary_color = primary_color;
     // }
     // if (secondary_color) {
     //    this.secondary_color = secondary_color;
     // }

     return new School(_id,school,team_name,mascot,conference,division,wins,primary_color,secondary_color);
  }
}
