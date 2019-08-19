import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { RegisterService } from '../services/register.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = new User();
  data = {};
  constructor(private _registerService: RegisterService) { }

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
