import { Component, OnInit } from '@angular/core';
import {TabItem} from "../../../../../../share/dto/TabItem";

@Component({
  selector: 'app-salary-advance-context',
  templateUrl: './salary-advance-context.component.html',
  styleUrls: ['./salary-advance-context.component.scss']
})
export class SalaryAdvanceContextComponent implements OnInit {

  tabs: TabItem[] = [
    {
      label: 'New Salary Advance',
      icon: 'apartment',
      route: '/dashboard/access/hr/salary-advance/newSalary/NewSalaryAdvance'

    },
    {
      label: 'Salary Advance History',
      icon: 'apartment',
      route: '/dashboard/access/hr/salary-advance/historySalary/HistorySalaryAdvance'

    },
    // {
    //   label: ' Advance clearance',
    //   icon: 'apartment',
    //   route: '/dashboard/access/hr/salary-advance/advanceClearance/salaryAdvanceClearance'
    //
    // },
    {
      label: ' Advance clearance History',
      icon: 'apartment',
      route: '/dashboard/access/hr/salary-advance/advanceClearanceHistory/HistorySalaryAdvanceClearance'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
