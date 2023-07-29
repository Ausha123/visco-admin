import { Component, OnInit } from '@angular/core';
import {AttendanceService} from "../../../../../../../../../share/service/attendance/attendance.service";
import {CommonSnackBarService} from "../../../../../../../../../share/service/core/common-snack-bar-service.service";

@Component({
  selector: 'app-attendance-delete-pop-up',
  templateUrl: './attendance-delete-pop-up.component.html',
  styleUrls: ['./attendance-delete-pop-up.component.scss']
})
export class AttendanceDeletePopUpComponent implements OnInit {

  constructor(private attendanceService:AttendanceService,private commonSnackBarService:CommonSnackBarService) { }

  ngOnInit(): void {
  }

  deleteAttendance(){
    let object=this.attendanceService.getObject();
    this.attendanceService.deleteAttendance(object.propertyId)
      .subscribe((res:any)=>{
        // alert("Attendance Delete Successfully...");
          this.openSnackBar(res.message,'close');
          location.reload();
      },
        error => {
        console.log(error);
          this.openSnackBar(error.message,'close');
        }
        )
  }

  openSnackBar(message: string, action: string) {
    this.commonSnackBarService.trigger(message, action, [
      10000, 'success-snack-bar-common',
      'end',
      'top'
    ]);
  }
}
