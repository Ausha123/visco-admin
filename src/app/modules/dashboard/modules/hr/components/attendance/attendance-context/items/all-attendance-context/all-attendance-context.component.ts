import { Component, OnInit } from '@angular/core';
import {AttendanceService} from "../../../../../../../../share/service/attendance/attendance.service";

@Component({
  selector: 'app-all-attendance-context',
  templateUrl: './all-attendance-context.component.html',
  styleUrls: ['./all-attendance-context.component.scss']
})
export class AllAttendanceContextComponent implements OnInit {

  constructor(private attendanceService:AttendanceService) { }

  ngOnInit(): void {
  }


}
