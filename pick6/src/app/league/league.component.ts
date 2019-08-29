import { Component, OnInit } from '@angular/core';
import { LeaguePageService } from '../services/league-page.service';
import { LoginService } from '../services/login.service';
import { User } from '../models/user';
import { League } from '../models/league';
import { NewUserService } from '../services/new-user.service';
import { NewLeagueService } from '../services/new-league.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {

   league: League;
   id: String;
   teams = [];
   users = {};
   currentUser: User;

  constructor(private _newLeague: NewLeagueService, private router: Router, private route: ActivatedRoute, private _leaguesPage: LeaguePageService, private _loginService: LoginService) {
     this.league = _newLeague.newLeague();
     this.id = route.snapshot.paramMap.get('id');
     this._loginService.currentUser.subscribe(x => this.currentUser = x);
     this._leaguesPage.getLeaguePage(this.id).subscribe(
       data => {
          console.log('Success!', JSON.stringify(data)),
          this.league = data.league,
          this.teams = data.teams,
          this.users = data.users
       },
       error => console.error('Error!', error)
     );
  }

  ngOnInit() {
  }

  manage(id) {
     this.router.navigate(['leagueadmin',id]);
 }

}
