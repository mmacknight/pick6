import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { NewUserService } from '../services/new-user.service';
import { RegisterService } from '../services/register.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  data = {};
  constructor(private _newUser: NewUserService, private _registerService: RegisterService) {
     this.user = _newUser.newUser();
  }

  ngOnInit() {
  }

  onSubmit() {
     this._registerService.register(this.user)
      .subscribe(
         data => console.log('Success!', JSON.stringify(data)),
         error => console.error('Error!', error)
      )
  }

}
