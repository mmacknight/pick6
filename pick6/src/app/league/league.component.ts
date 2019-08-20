import { Component, OnInit } from '@angular/core';
import { LeaguePageService } from '../services/league-page.service';
import { LoginService } from '../services/login.service';
import { User } from '../user';
import { League } from '../league';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {

   league = new League('','','','',[]);
   id = 0;
   teams = [];
   users = {};
   currentUser = new User('','','','','','');

  constructor(private route: ActivatedRoute, private _leaguesPage: LeaguePageService, private _loginService: LoginService) {
     this.id = route.snapshot.paramMap.get('id');
     this._loginService.currentUser.subscribe(x => this.currentUser = x);
     this._leaguesPage.getLeaguePage(this.id).subscribe(
       data => {
          console.log('Success!', JSON.stringify(data)),
          this.league = data.league,
          this.teams = data.teams,
          this.users = data.users;
       },
       error => console.error('Error!', error)
     );
  }

  ngOnInit() {
  }

}
