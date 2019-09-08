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


@Component({
  selector: 'app-league-admin',
  templateUrl: './league-admin.component.html',
  styleUrls: ['./league-admin.component.css']
})
export class LeagueAdminComponent implements OnInit {

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
      addTeam = false;

     constructor(private _updateTeam: UpdateTeamService, private _addTeam: AddTeamService, private _getSchools: GetSchoolsService, private router: Router, private route: ActivatedRoute, private _leaguesPage: LeaguePageService, private _loginService: LoginService) {
        if (!this._loginService.currentUserValue) {
            this.router.navigate(['/login']);
        };
        this.league = new League();
        this.id = route.snapshot.paramMap.get('id');
        this._loginService.currentUser.subscribe(
           user =>  {
              this.currentUser = user,
              // (this.currentUser) ? this.router.navigate(['/login']) : '',
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
                     }),
                      this.users = data.users,
                      console.log(this.users),
                      // console.log(this.currentUser._id, this.league.admin),
                      (this.currentUser._id == this.league.admin) ? console.log('Authorized.') : this.router.navigate(['league',this.id]);
                   }
                },
                error => console.error('Error!', error)
              )
           }
        );
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

     select(index) {
        this.selected = index;
     }

     selectSchool(school) {
        this.teams[this.selected-1].schools[this.teams[this.selected-1].schools.length] = school._id;
        // this.deSelect()
        this.unavailable[school._id] = true;
     }

     removeSchool(id,team_id) {
        if (this.selected-1 == team_id) {
           this.teams[this.selected-1].schools = this.teams[this.selected-1].schools.filter(item => item !== id);
           this.unavailable[id] = false;
        }
     }

     onSubmit(user) {
        console.log(user);
        this._addTeam.add(user, this.league)
        .subscribe(
           data => {
             if (data.success) {
                console.log('Success!', JSON.stringify(data));
                this.addSuccess = true;
             } else {
                this.addFailure = true;
             }
           },
           error => console.error('Error!', error)
        )
     }
     deSelect() {
        this.newTeam = new Team();
        this.newTeam._id = this.teams[this.selected-1]._id;
        this.teams[this.selected-1].schools.length >= 1 ? this.newTeam.school0 = this.teams[this.selected-1].schools[0] : this.newTeam.school0 = '';
        this.teams[this.selected-1].schools.length >= 2 ? this.newTeam.school1 = this.teams[this.selected-1].schools[1] : this.newTeam.school1 = '';
        this.teams[this.selected-1].schools.length >= 3 ? this.newTeam.school2 = this.teams[this.selected-1].schools[2] : this.newTeam.school2 = '';
        this.teams[this.selected-1].schools.length >= 4 ? this.newTeam.school3 = this.teams[this.selected-1].schools[3] : this.newTeam.school3 = '';
        this.teams[this.selected-1].schools.length >= 5 ? this.newTeam.school4 = this.teams[this.selected-1].schools[4] : this.newTeam.school4 = '';
        this.teams[this.selected-1].schools.length >= 6 ? this.newTeam.school5 = this.teams[this.selected-1].schools[5] : this.newTeam.school5 = '';
        this.selected = 0;
        this._updateTeam.update(this.newTeam).subscribe(
           data => {
               data.success ? console.log('Success!', JSON.stringify(data)) : 0;
            },
            error => console.error('Error!', error)
        )
     }

     toggleAddTeam() {
        this.addTeam = !this.addTeam;
     }

   //   setMyStyles(school) {
   //      let styles = {
   //        'background-color': school.primary_color ? school.primary_color: 'black',
   //        'color': school.secondary_color ? school.secondary_color : 'white',
   //        'font-weight': 'bold'
   //      };
   //      return this._sanitizer.bypassSecurityTrustStyle(styles);
   //    }
   //
   }
