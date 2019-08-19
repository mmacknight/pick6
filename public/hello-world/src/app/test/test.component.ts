import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import {EmployeeService} from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

   public employees = [  ];
  constructor(public _employeeService: EmployeeService) { }


  ngOnInit() {
     this._employeeService.getEmployees().subscribe(data => this.employees = data, error => console.log(error));
  }

}
