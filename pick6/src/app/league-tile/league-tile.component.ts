import { Component, OnInit, Input } from '@angular/core';
import { League } from '../models/league';
import { Team } from '../models/team';
import { GetTeamService } from '../services/get-team.service'
import { GetSchoolsService } from '../services/get-schools.service'


@Component({
  selector: 'app-league-tile',
  templateUrl: './league-tile.component.html',
  styleUrls: ['./league-tile.component.css']
})
export class LeagueTileComponent implements OnInit {

   team : Team;
   schools = [];
   schoolsJSON = {};
   schoolsList = [];
   league_id: String;
   league_name: String;
   user_id: String;

  constructor(private _getTeamService: GetTeamService, private _getSchoolsService: GetSchoolsService) {
     _getSchoolsService.getSchools().subscribe(
      data => {
          if (data.success) {
             this.schoolsJSON = data.schoolsJSON;
          }
      }
    )
 }

  @Input()
  set inp(input) {
     this.league_id = input[0];
     this.league_name = input[1];
     this.user_id = input[2];
     this._getTeamService.getTeam(this.league_id, this.user_id).subscribe(
        data => {
           console.log(data);
           if (data.success) {
             console.log(data.team);
             this.team = data.team;
             this.schools = ['','','','','',''];
             this.team.school0 ? this.schools[0] = this.team.school0 : 0;
             this.team.school1 ? this.schools[1] = this.team.school1 : 0;
             this.team.school2 ? this.schools[2] = this.team.school2 : 0;
             this.team.school3 ? this.schools[3] = this.team.school3 : 0;
             this.team.school4 ? this.schools[4] = this.team.school4 : 0;
             this.team.school5 ? this.schools[5] = this.team.school5 : 0;
             this.schools = this.schools.filter(item => item !== '');
             console.log(this.schools);
          }
       }
    )


}
  ngOnInit() {

  }

}
