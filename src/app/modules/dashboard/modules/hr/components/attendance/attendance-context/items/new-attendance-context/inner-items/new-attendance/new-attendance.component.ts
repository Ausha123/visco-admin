import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {AttendanceService} from "../../../../../../../../../../share/service/attendance/attendance.service";
import {EmployeeService} from "../../../../../../../../../../share/service/employee/employee.service";
import {CommonSnackBarService} from "../../../../../../../../../../share/service/core/common-snack-bar-service.service";

@Component({
  selector: 'app-new-attendance',
  templateUrl: './new-attendance.component.html',
  styleUrls: ['./new-attendance.component.scss']
})
export class NewAttendanceComponent implements OnInit {

  constructor(private attendanceService:AttendanceService, private employeeService:EmployeeService,private commonSnackBarService:CommonSnackBarService) { }
  allEmployee:any=[];
  object:any;
  ngOnInit(): void {
    this.getAllEmployee();
  }

  newAttendanceForm = new FormGroup({
    dateOfAttend: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    dateOfLeave: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    note: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    employeeName:new FormControl(null,
      Validators.required)
  });


  addAttendance(formDirective:FormGroupDirective){
    let dateOfAttend:string = this.newAttendanceForm.get('dateOfAttend')?.value;
    let dateOfLeave:string = this.newAttendanceForm.get('dateOfLeave')?.value;
    let note:string = this.newAttendanceForm.get('note')?.value;


    const data = {
      attentDate: dateOfAttend,
      leaveDate: dateOfLeave,
      extraNote: note,
    }

    this.attendanceService.saveAttendance(data,this.object.propertyId)
      .subscribe((res: any) => {
          console.log(res);
          // alert("Attendance save Successfully...");
          if (res.code === 201) {
            this.clearFields(formDirective, this.newAttendanceForm);
            this.openSnackBar(res.message, 'close');
          } else {
            this.openSnackBar('Something went wrong try again!', 'close');
          }
        },
        (error: any) => {
          console.log(error);
          this.openSnackBar(error.message,'close');
        }
      )
  }

  getAllEmployee(){
    this.employeeService.getAllEmployees()
      .subscribe((res:any)=>{
        this.allEmployee=res.data;
      },
        error => {
        console.log(error);
        }
        )
  }

  getEmployee(object:any) {
    this.object=object;
  }

  openSnackBar(message: string, action: string) {
    this.commonSnackBarService.trigger(message, action, [
      10000, 'success-snack-bar-common',
      'end',
      'top'
    ]);
  }

  clearFields(formDirective: FormGroupDirective, form: FormGroup): void {
    form.reset(); // Reset form data
    formDirective.resetForm(); // Reset the ugly validators
  }

}
