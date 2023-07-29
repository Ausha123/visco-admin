import { Component, OnInit } from '@angular/core';
import {TabItem} from "../../../../../../share/dto/TabItem";


@Component({
  selector: 'app-employee-context',
  templateUrl: './employee-context.component.html',
  styleUrls: ['./employee-context.component.scss']
})
export class EmployeeContextComponent implements OnInit {

  tabs: TabItem[] = [
    {
      label: 'New Employee',
      icon: 'apartment',
      route: '/dashboard/access/hr/employee/newEmployee/employeeNew'

    },
    {
      label: 'All Employee',
      icon: 'apartment',
      route: '/dashboard/access/hr/employee/allEmployee/list'

    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
