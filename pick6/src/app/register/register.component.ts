import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { RegisterService } from '../services/register.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  data = {};
  failure = false;

  constructor(private router: Router, private _registerService: RegisterService) {
     this.user = new User();
  }

  ngOnInit() {
  }

  onSubmit() {
     console.log(this.user);
     this._registerService.register(this.user)
      .subscribe(
         data => {
           if (data.success) {
              console.log('Success!', JSON.stringify(data));
              this.router.navigate(['/login']);
           } else {
              this.failure = true;
           }
        },
        error => console.error('Error!', error)
      )
  }

}
