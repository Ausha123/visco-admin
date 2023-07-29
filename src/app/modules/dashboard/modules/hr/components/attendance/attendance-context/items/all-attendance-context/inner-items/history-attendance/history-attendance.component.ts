import { Component, OnInit } from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {EmployeeBottemSheetComponent} from "../../../../../../Employee/employee-context/items/bottom-sheet/employee-bottem-sheet/employee-bottem-sheet.component";
import {MatDialog} from "@angular/material/dialog";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {AttendanceBottomSheetComponent} from "../../../bottom-sheet/attendance-bottom-sheet/attendance-bottom-sheet.component";
import {AttendanceService} from "../../../../../../../../../../share/service/attendance/attendance.service";
import {debounceTime, pipe} from "rxjs";

export interface PeriodicElement {
  attendDate: string;
  leaveDate: string;
  extraNote:string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  { attendDate: '2022/06/21',  leaveDate: '2022/06/21', extraNote:'hhhhhh'},

];


@Component({
  selector: 'app-history-attendance',
  templateUrl: './history-attendance.component.html',
  styleUrls: ['./history-attendance.component.scss']
})
export class HistoryAttendanceComponent implements OnInit {

  displayedColumns: string[] = ['attendDate', 'leaveDate', 'extraNote','manageData'];
  dataSource = ELEMENT_DATA;


  page: number | undefined = 0;
  pageSize: number | undefined = 10;
  pageSizeOptions = [5, 10, 20, 30, 50, 80, 100];
  dataCount = 0;
  pageEvent: PageEvent | undefined;
  activeState = 'active';
  searchText = '';

  allAttendance:any=[];

  constructor(private dialog: MatDialog,private bottomSheet: MatBottomSheet,private attendanceService:AttendanceService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.getAllAttendance();
    }, 500);
  }


  getAllAttendance(){
    this.allAttendance=[];
    this.attendanceService.getAllAttendanceByEmployeeName(this.page,this.pageSize)
      .subscribe((res:any)=>{
        this.dataCount=res.data.dataCount;
        this.allAttendance=res.data.list;
      },
      error => {
        console.log(error);
      }
      )
  }

  manage(object:any) {
    this.bottomSheet.open(AttendanceBottomSheetComponent);
    this.attendanceService.setObject(object);
  }

  public getServerData(event?: PageEvent): any {
    this.pageSize = event?.pageSize;
    this.page = event?.pageIndex;
    console.log(event);
    this.getAllAttendance();
  }
}
