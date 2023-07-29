import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CustomerService} from "../../../../../../../../../share/service/customer/customer.service";
import {PayrollService} from "../../../../../../../../../share/service/payroll/payroll.service";
import {EmployeeService} from "../../../../../../../../../share/service/employee/employee.service";
import {CommonSnackBarService} from "../../../../../../../../../share/service/core/common-snack-bar-service.service";

@Component({
  selector: 'app-payroll-update-pop-up',
  templateUrl: './payroll-update-pop-up.component.html',
  styleUrls: ['./payroll-update-pop-up.component.scss']
})
export class PayrollUpdatePopUpComponent implements OnInit {
  private object=this.payrollService.getObject();
  constructor(private payrollService:PayrollService,private employeeService: EmployeeService,
              private commonSnackBarService:CommonSnackBarService) { }

  ngOnInit(): void {
    this.updatePayrollForm.get('date')?.setValue(this.object.date)
    this.updatePayrollForm.get('workingHours')?.setValue(this.object.workingHours)
    this.updatePayrollForm.get('workingDays')?.setValue(this.object.workingDays)
    this.updatePayrollForm.get('basic')?.setValue(this.object.basic)
    this.updatePayrollForm.get('Allowance')?.setValue(this.object.allowance)
    this.updatePayrollForm.get('Deduction')?.setValue(this.object.deduction)
    this.updatePayrollForm.get('netPay')?.setValue(this.object.netPay)
  }

   updatePayrollForm = new FormGroup({
    date: new FormControl(),
    workingHours: new FormControl(),
    workingDays: new FormControl(),
    basic: new FormControl(),
    Allowance: new FormControl(),
    Deduction: new FormControl(),
    netPay: new FormControl(),
  });

  updatePayroll(){

    let date:string = this.updatePayrollForm.get('date')?.value;
    let workingHours:string = this.updatePayrollForm.get('workingHours')?.value;
    let workingDays:string = this.updatePayrollForm.get('workingDays')?.value;
    let basic:string = this.updatePayrollForm.get('basic')?.value;
    let Allowance:string = this.updatePayrollForm.get('Allowance')?.value;
    let Deduction:any = this.updatePayrollForm.get('Deduction')?.value;
    let netPay:any = this.updatePayrollForm.get('netPay')?.value;


    const data = {
      date: date,
      workingHours: workingHours,
      workingDays: workingDays,
      basic: basic,
      allowance: Allowance,
      deduction: Deduction,
      netPay: netPay,
    }

    this.payrollService.updatePayroll(data,this.object.payrollId)
      .subscribe((res: any) => {
          console.log(res);
          // alert("Payroll update Successfully...");
          this.openSnackBar(res.message,'close');
          location.reload();
        },
        (error: any) => {
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
