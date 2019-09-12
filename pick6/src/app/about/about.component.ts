import { Component, OnInit } from '@angular/core';
import { WindowRefService } from '../services/window-ref.service';
import { LoginService } from '../services/login.service';
import { User } from '../models/user';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  height = 0;
  currentUser: User;

  constructor(private winRef: WindowRefService, private loginService: LoginService) {
     this.loginService.currentUser.subscribe(
       x =>  {
          this.currentUser = x
       }
     );
     this.getHeight();
  }

  getHeight() {
     this.height = this.winRef.nativeWindow.innerHeight;
  }

  ngOnInit() {
  }

}
