import { Component, OnInit } from '@angular/core';
import { League } from '../models/league';
import { User } from '../models/user';
import { CreateLeague } from '../services/league.service'
import { AddTeamService } from '../services/add-team.service'
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-league',
  templateUrl: './create-league.component.html',
  styleUrls: ['./create-league.component.css']
})

export class CreateLeagueComponent implements OnInit {
  league: League;
  currentUser: User;
  form = {};
  n_teams = 0;
  max_teams = 30;
  teams = []
  data = {};
  invalid = false;
  example = false;

  constructor(private _createLeague: CreateLeague, private _addTeam: AddTeamService, private _loginService: LoginService, private router: Router) {
     if (this.router.url == '/') {
        this.currentUser = new User();
        this.currentUser.username = "exampleplayer";
        this.currentUser.first = "Example";
        this.currentUser.last = "Player";
        this.currentUser._id = "5d79dcad5d10bd6db024df95";
        this.example = true;
        this.league = new League();
        this.league.name = "Example League";
        this.league._id = "5d79dcbf5d10bd6db024df96";
        this.league.admin = "5d79dcbf5d10bd6db024df96";
     } else {
        if (!this._loginService.currentUserValue) {
            this.router.navigate(['/login']);
        };
        this._loginService.currentUser.subscribe(
           x =>  {
              this.currentUser = x
              this.league = new League();
              // this.league = _newLeague.newLeague();
              this.league.admin = x._id;
           }
        );
     }
  }

  ngOnInit() {
  }

  onSubmit(form) {
     if (this.league) {
        this.league.admin = this.currentUser._id;
        this.league.teams = Object.values(form.value.teams);
        this.league.teams.push(this.currentUser.username);

        this._createLeague.create(this.league)
         .subscribe(
            data => {
               if (data.success) {
                  this.invalid = false;
                  this.league._id = String(data.leagueid),
                  console.log(this.league._id),
                  console.log('Success!', JSON.stringify(data)),
                  this.sendTeams(this.league.teams);
                  this.router.navigate(['/leagueadmin',this.league._id]);
               }
               else {
                  console.log('Failure!', JSON.stringify(data)),
                  this.invalid = true;
               }
            },
            error => console.error('Error!', error)
         );
      }
  }

  sendTeams(teams) {
     for (let team of teams) {
        this._addTeam.add(team, this.league)
        .subscribe(
           data => console.log('Success!', JSON.stringify(data)),
           error => console.error('Error!', error)
        )
     }
 }

  addTeam() {
     this.n_teams = this.n_teams + 1;
     this.teams = Array(this.n_teams);
     for (var i = 0; i < this.n_teams; i++) {
       this.teams[i] = i + 1;
     }
 }
 subtractTeam() {
    this.n_teams = this.n_teams - 1;
    this.teams = Array(this.n_teams);
    for (var i = 0; i < this.n_teams; i++) {
      this.teams[i] = i + 1;
    }
 }

}
