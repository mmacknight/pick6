import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() public currentUser;
  default = "Sign In";

  constructor(private _loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
     this.currentUser = null;
     this._loginService.logout();
     this.router.navigate(['login']);
  }

}
