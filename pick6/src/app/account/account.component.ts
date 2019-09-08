import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UpdateAccountService } from '../services/update-account.service'
import { LoginService } from '../services/login.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
   user: User;
   data = {};
   failure = false;

   constructor(private router: Router, private _loginService: LoginService, private _updateAccountService: UpdateAccountService) {
      this.user = new User();
      if (this._loginService.currentUserValue) {
         for (const [key, value] of Object.entries(this._loginService.currentUserValue)) {
            if (key != "authdata") {
               this.user[key] = value;
            }
         }
         this.user.password = '';
     } else {
        this.router.navigate(['/login']);
     }
   }

   ngOnInit() {
   }

   onSubmit() {
      console.log(this.user);
      this._updateAccountService.update(this.user)
       .subscribe(
          data => {
            if (data.success) {
               console.log('Success!', JSON.stringify(data));
               this._loginService.updateUser(data.user);
               this.router.navigate(['/']);
            } else {
               this.failure = true;
            }
         },
         error => console.error('Error!', error)
       )
   }

 }
