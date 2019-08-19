import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';
import { User } from './user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pick6';
  currentUser: User;

   constructor( private _loginService: LoginService, private _registerService: RegisterService, private router: Router ) {
      this._loginService.currentUser.subscribe(x => this.currentUser = x);
   }

   login() {
      this.router.navigate(['login']);
   }

   register() {
      this.router.navigate(['register']);
   }

   logout() {
      this._loginService.logout();
      this.router.navigate(['login']);
   }
}
