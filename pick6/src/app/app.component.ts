import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { WindowRefService } from './services/window-ref.service';
import { RegisterService } from './services/register.service';
import { User } from './models/user';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pick6';
  currentUser: User;
  height = 0;

   constructor(private winRef: WindowRefService, private _loginService: LoginService, private _registerService: RegisterService, private router: Router ) {
      this.getHeight();
      this._loginService.currentUser.subscribe(x => this.currentUser = x);
      console.log(environment.server);
   }

  getHeight() {
     this.height = this.winRef.nativeWindow.innerHeight;
  }

   login() {
      this.router.navigate(['login']);
   }

   register() {
      this.router.navigate(['register']);
   }

   logout() {
      this.currentUser = null;
      this._loginService.logout();
      this.router.navigate(['login']);
   }

   getMargin() {
       return this.router.url != '/' ? '2%' : '0';
   }

}
