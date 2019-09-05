import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   user = {"username": "", "password": ""};
   data = {};
   failure = false;

   constructor(private _loginService: LoginService, private router: Router) {
      console.log(this._loginService.currentUserValue)
      if (this._loginService.currentUserValue) {
          this.router.navigate(['/']);
      }
   }

   ngOnInit() {
   }

   onSubmit() {
      this._loginService.login(this.user.username, this.user.password)
       .subscribe(
          data => {
             if (data.success) {
                console.log('Success!', JSON.stringify(data));
                this.router.navigate(['/']);
             } else {
                this.failure = true;
             }
         },
          error => console.error('Error!', error)
       )
   }

 }
