import { Component, OnInit } from '@angular/core';
import { GetLeaguesService } from '../services/get-leagues.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { User } from '../user';
import { League } from '../league';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

   leagues = [];
   currentUser = new User();

  constructor(private router: Router, private _getLeaguesService: GetLeaguesService, private _loginService: LoginService) {
     this._loginService.currentUser.subscribe(x => this.currentUser = x);
     console.log(JSON.stringify(this.currentUser._id));
     this._getLeaguesService.getLeagues(this.currentUser._id).subscribe(
        data => {
           console.log('Success!', JSON.stringify(data)),
           this.leagues = data.leagues
        },
        error => console.error('Error!', error)
     );
  }

  ngOnInit() {
  }

  onSelect(id) {
     this.router.navigate(['/league',id]);
 }

}
