import { Component, OnInit } from '@angular/core';
import { LeaguePageService } from '../services/league-page.service';
import { LoginService } from '../services/login.service';
import { User } from '../models/user';
import { League } from '../models/league';
import { NewUserService } from '../services/new-user.service';
import { GetSchoolsService } from '../services/get-schools.service';
import { NewLeagueService } from '../services/new-league.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-league-admin',
  templateUrl: './league-admin.component.html',
  styleUrls: ['./league-admin.component.css']
})
export class LeagueAdminComponent implements OnInit {

      league: League;
      id: String;
      teams = [];
      users = {};
      currentUser: User;
      selected = '';
      schools = [];
      schoolsJSON = {};
      unavailable = {};

     constructor(private _sanitizer: DomSanitizer, private _getSchools: GetSchoolsService, private _newLeague: NewLeagueService, private router: Router, private route: ActivatedRoute, private _leaguesPage: LeaguePageService, private _loginService: LoginService) {
        this.league = _newLeague.newLeague();
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
                      this.teams.map(team => team.schools = []),
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
        this.schools = _getSchools.getSchools().subscribe(
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
        if (this.teams[index-1].schools.length < 6) {
           this.selected = index;
        }

     }

     selectSchool(school) {
        this.teams[this.selected-1].schools[this.teams[this.selected-1].schools.length] = school._id;
        this.selected = '';
        this.unavailable[school._id] = true;
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
