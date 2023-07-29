import { Component, OnInit } from '@angular/core';
import {TabItem} from "../../../../../../share/dto/TabItem";

@Component({
  selector: 'app-attendance-context',
  templateUrl: './attendance-context.component.html',
  styleUrls: ['./attendance-context.component.scss']
})
export class AttendanceContextComponent implements OnInit {

  tabs: TabItem[] = [
    {
      label: 'New Attendance',
      icon: 'apartment',
      route: '/dashboard/access/hr/attendance/newAttendance/attendanceNew'

    },
    {
      label: 'Attendance History',
      icon: 'apartment',
      route: '/dashboard/access/hr/attendance/allAttendance/historyAttendance'

    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
