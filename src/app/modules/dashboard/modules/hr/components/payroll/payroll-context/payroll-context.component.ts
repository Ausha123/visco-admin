import { Component, OnInit } from '@angular/core';
import {TabItem} from "../../../../../../share/dto/TabItem";

@Component({
  selector: 'app-payroll-context',
  templateUrl: './payroll-context.component.html',
  styleUrls: ['./payroll-context.component.scss']
})
export class PayrollContextComponent implements OnInit {


  tabs: TabItem[] = [
    {
      label: 'New Payroll',
      icon: 'apartment',
      route: '/dashboard/access/hr/payroll/newPayroll/PayrollNew'

    },
    {
      label: 'All Payroll',
      icon: 'apartment',
      route: '/dashboard/access/hr/payroll/allPayroll/PayrollAll'

    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
