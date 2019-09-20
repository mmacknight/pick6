import { Component, OnInit } from '@angular/core';
import { GetLeaguesService } from '../services/get-leagues.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { League } from '../models/league';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

   leagues = [];
   currentUser: User;
   hovering = [];

  constructor(private router: Router, private _getLeaguesService: GetLeaguesService, private _loginService: LoginService) {
     this._loginService.currentUser.subscribe(
        x =>  {
           if (x) {
             this.currentUser = x,
             this._getLeaguesService.getLeagues(x._id).subscribe(
                data => {
                   console.log(data),
                   console.log('Success!', JSON.stringify(data)),
                   this.leagues = data.leagues,
                   this.hovering.push(0)
                },
                error => console.error('Error!', error)
             )
          }
        }
     );
  }

  ngOnInit() {
  }

  onSelect(id) {
     this.router.navigate(['league',id]);
 }

 onHover(index) {
      this.hovering[index] = 1;
 }

 offHover(index) {
    this.hovering[index] = 0;
}

}
