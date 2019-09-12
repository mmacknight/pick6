import { Component, OnInit } from '@angular/core';
import { WindowRefService } from '../services/window-ref.service';
import { LeaguePageService } from '../services/league-page.service';
import { LoginService } from '../services/login.service';
import { User } from '../models/user';
import { League } from '../models/league';
import { Team } from '../models/team';
import { GetSchoolsService } from '../services/get-schools.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AddTeamService } from '../services/add-team.service'
import { UpdateTeamService } from '../services/update-team.service';


@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {

   league: League;
   newTeam: Team;
   id: String;
   teams = [];
   users = {};
   rank = {};
   currentUser: User;
   selected = 0;
   schools = [];
   schoolsJSON = {};
   unavailable = {};
   addFailure = false;
   addSuccess = false;
   addTeam = false;
   width = 0;

  constructor( private winRef: WindowRefService, private _updateTeam: UpdateTeamService, private _addTeam: AddTeamService, private _getSchools: GetSchoolsService, private router: Router, private route: ActivatedRoute, private _leaguesPage: LeaguePageService, private _loginService: LoginService) {
     this.width = winRef.nativeWindow.innerWidth;
     if (!this._loginService.currentUserValue) {
         this.router.navigate(['/login']);
     };
     this.league = new League();
     // this.league = _newLeague.newLeague();
     this.id = route.snapshot.paramMap.get('id');
     this._loginService.currentUser.subscribe(
        user =>  {
           this.currentUser = user,
           // (this.currentUser) ? this.router.navigate(['/login']) : '',
           this._leaguesPage.getLeaguePage(this.id).subscribe(
             data => {
                if (data.success) {
                   console.log('Success!'),
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
                     team.schools = team.schools.filter(item => item !== '')
                  }),
                  this.users = data.users,
                  _getSchools.getSchools().subscribe(
                    data => {
                       if (data.success) {
                          this.schools = data.schools;
                          this.schoolsJSON = data.schoolsJSON;
                          console.log(this.schoolsJSON);
                          this.teams.map(team => {
                             team.wins = team.schools.map(a => this.schoolsJSON[a].wins).reduce((a,b) => a+b)
                          });

                          this.teams = this.teams.sort((a,b) => { return b.wins - a.wins});
                          for (var i = 0; i < this.teams.length; i++) {
                             if (i === 0) {
                                this.rank[this.teams[i]._id] = 1;
                             } else {
                                this.rank[this.teams[i]._id] = this.teams[i].wins != this.teams[i-1].wins ? i+1 : this.rank[this.teams[i-1]._id];
                             }
                          }
                       }
                    }
                 ),
                  (this.currentUser._id == this.league.admin) ? console.log('Authorized.') : this.router.navigate(['league',this.id]);
                }
             },
             error => console.error('Error!', error)
           )
        }
     );

     console.log("RANK",this.rank);
   }

   getWidth() {
      this.width = this.winRef.nativeWindow.innerWidth;
      return(this.winRef.nativeWindow.innerWidth);
   }

   manage(id) {
      this.router.navigate(['/leagueadmin',id]);
   }

  ngOnInit() {
  }




}
