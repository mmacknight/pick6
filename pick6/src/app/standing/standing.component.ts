import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../models/team';
import { User } from '../models/user';

@Component({
  selector: 'app-standing',
  templateUrl: './standing.component.html',
  styleUrls: ['./standing.component.css']
})
export class StandingComponent implements OnInit {

   team;
   schoolsJSON = {};
   rank = 0;
   user: User;
   games = {};
   scores = false;
   width = 0;
  constructor() {

  }

  @Input()
  set inp(input) {
     this.team = input[0];
     this.user = input[1];
     this.rank = input[2];
     this.schoolsJSON = input[3];
     this.scores = input[4];
     this.games = input[5];
     this.width = input[6];
  }

   ngOnInit() {
   }

}
