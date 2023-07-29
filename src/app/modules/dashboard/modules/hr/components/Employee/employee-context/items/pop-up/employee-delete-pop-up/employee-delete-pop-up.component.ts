import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../../../../../../../../share/service/employee/employee.service";
import {CommonSnackBarService} from "../../../../../../../../../share/service/core/common-snack-bar-service.service";

@Component({
  selector: 'app-employee-delete-pop-up',
  templateUrl: './employee-delete-pop-up.component.html',
  styleUrls: ['./employee-delete-pop-up.component.scss']
})
export class EmployeeDeletePopUpComponent implements OnInit {

  constructor(private employeeServeice:EmployeeService,private commonSnackBarService:CommonSnackBarService) { }

  ngOnInit(): void {
  }

  deleteEmployee(){
    let object=this.employeeServeice.getObject();
    this.employeeServeice.deleteEmployee(object.propertyId)
      .subscribe((res:any)=>{
        // alert("Employee Delete Successfully...");
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
