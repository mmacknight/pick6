import { Component, OnInit } from '@angular/core';
import { League } from '../league';
import { User } from '../user';
import { CreateLeague } from '../services/league.service'
import { AddTeamService } from '../services/add-team.service'
import { LoginService } from '../services/login.service';
import { tap } from 'rxjs/operators';
import { from } from 'rxjs';


@Component({
  selector: 'app-create-league',
  templateUrl: './create-league.component.html',
  styleUrls: ['./create-league.component.css']
})

export class CreateLeagueComponent implements OnInit {
  league = new League();
  currentUser = new User();
  form = {};
  n_teams = 0;
  max_teams = 10;
  teams = []
  data = {};

  constructor(private _createLeague: CreateLeague, private _addTeam: AddTeamService, private _loginService: LoginService) {
     this._loginService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
  }

  onSubmit(form) {
     this.league.admin = this.currentUser.username;
     this.league.numteams = String(this.n_teams);
     this.league.teams = Object.values(form.value.teams);
     this.league.teams.push(this.league.admin);

     this._createLeague.create(this.league)
      .subscribe(
         data => {
            console.log('Success!', JSON.stringify(data)),
            this.sendTeams(this.league.teams);
         },
         error => console.error('Error!', error)
      );

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
