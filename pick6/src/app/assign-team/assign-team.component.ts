import { Component, OnInit } from '@angular/core';
import { LeaguePageService } from '../services/league-page.service';
import { LoginService } from '../services/login.service';
import { User } from '../models/user';
import { League } from '../models/league';
import { Team } from '../models/team';
import { School } from '../models/school';
import { GetSchoolsService } from '../services/get-schools.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AddTeamService } from '../services/add-team.service'
import { UpdateTeamService } from '../services/update-team.service';
import { DeleteLeagueService } from '../services/delete-league.service';
import { DeleteTeamService } from '../services/delete-team.service';

@Component({
  selector: 'app-assign-team',
  templateUrl: './assign-team.component.html',
  styleUrls: ['./assign-team.component.css']
})
export class AssignTeamComponent implements OnInit {

      league: League;
      newTeam: Team;
      id: String;
      teams = [];
      users = {};
      currentUser: User;
      selected = 0;
      schools = [];
      schoolsJSON = {};
      unavailable = {};
      addFailure = false;
      addSuccess = false;
      settings = false;
      mouseSchool = 0;
      // removeTeam = false;

     constructor(private _getSchools: GetSchoolsService, private _leaguesPage: LeaguePageService) {
        this.currentUser = new User();
        this.currentUser.username = "exampleplayer";
        this.currentUser.first = "Example";
        this.currentUser.last = "Player";
        this.currentUser._id = "5d79dcad5d10bd6db024df95";
        this.getLeague();
        _getSchools.getSchools().subscribe(
           data => {
             if (data.success) {
                this.schools = data.schools;
                this.schoolsJSON = data.schoolsJSON;
                // console.log(this.schools);
             }
          }
        )
     }

     ngOnInit() {
     }

     getLeague() {
        this.league = new League();
        this.id = "5d79dcbf5d10bd6db024df96";
        this._leaguesPage.getLeaguePage(this.id).subscribe(
             data => {
                if (data.success) {
                   console.log('Success!', JSON.stringify(data)),
                   this.league = data.league,
                   this.teams = data.teams,
                   this.teams.map(team => {
                     team.schools = ['','','','','',''],
                     team.school0 ? team.schools[0] = team.school0 : 0,
                     team.school1 ? team.schools[1] = team.school1 : 0,
                     team.school2 ? team.schools[2] = team.school2 : 0,
                     team.school3 ? team.schools[3] = team.school3 : 0,
                     team.school4 ? team.schools[4] = team.school4 : 0,
                     team.school5 ? team.schools[5] = team.school5 : 0,
                     team.schools = team.schools.filter(item => item !== '');
                     team.schools.map(school => this.unavailable[school] = 1);
                  });
               }
            }
        );
     }

   }
