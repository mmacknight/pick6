import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
   public employees = [  ];

  constructor(public _employeeService: EmployeeService) { }

  ngOnInit() {
     this._employeeService.getEmployees().subscribe(data => this.employees = data, error => console.log(error));

  }

}
