import { Component, OnInit } from '@angular/core';
import {PayrollService} from "../../../../../../../../../share/service/payroll/payroll.service";
import {CommonSnackBarService} from "../../../../../../../../../share/service/core/common-snack-bar-service.service";

@Component({
  selector: 'app-payroll-delete-pop-up',
  templateUrl: './payroll-delete-pop-up.component.html',
  styleUrls: ['./payroll-delete-pop-up.component.scss']
})
export class PayrollDeletePopUpComponent implements OnInit {

  constructor(private payRollService:PayrollService,   private commonSnackBarService:CommonSnackBarService) { }

  ngOnInit(): void {
  }

  deletePayroll(){
    let object= this.payRollService.getObject();
    this.payRollService.deletePayroll(object.payrollId)
      .subscribe((res: any)=>{
        // alert("Payroll Delete successfully...");
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
