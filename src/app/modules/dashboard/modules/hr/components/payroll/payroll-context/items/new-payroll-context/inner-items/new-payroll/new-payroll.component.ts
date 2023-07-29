import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {PayrollService} from "../../../../../../../../../../share/service/payroll/payroll.service";
import {EmployeeService} from "../../../../../../../../../../share/service/employee/employee.service";
import {CommonSnackBarService} from "../../../../../../../../../../share/service/core/common-snack-bar-service.service";

@Component({
  selector: 'app-new-payroll',
  templateUrl: './new-payroll.component.html',
  styleUrls: ['./new-payroll.component.scss']
})
export class NewPayrollComponent implements OnInit {
  object: any;
  private date=new Date()

  constructor(private payrollService:PayrollService, private employeeService: EmployeeService,
              private commonSnackBarService:CommonSnackBarService) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }
  allEmployee:any=[];
  newPayrollForm = new FormGroup({
    date: new FormControl(this.date,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    workingHours:new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    workingDays: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    basic: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    Allowance:new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    Deduction: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    netPay: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
  });

  addPayroll(formDirective:FormGroupDirective){
    let date:string = this.newPayrollForm.get('date')?.value;
    let workingHours:string = this.newPayrollForm.get('workingHours')?.value;
    let workingDays:string = this.newPayrollForm.get('workingDays')?.value;
    let basic:string = this.newPayrollForm.get('basic')?.value;
    let Allowance:string = this.newPayrollForm.get('Allowance')?.value;
    let Deduction:string = this.newPayrollForm.get('Deduction')?.value;
    let netPay:string = this.newPayrollForm.get('netPay')?.value;


    const data = {
      date: date,
      workingHours: workingHours,
      workingDays: workingDays,
      basic: basic,
      allowance: Allowance,
      deduction: Deduction,
      netPay: netPay,
    }

    this.payrollService.savePayroll(data,this.object.propertyId)
      .subscribe((res: any) => {
          console.log(res);
          // alert("Payroll save Successfully...");
          if (res.code === 201) {
            this.clearFields(formDirective, this.newPayrollForm);
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

  getAllEmployees(){
    this.employeeService.getAllEmployees()
      .subscribe((res:any)=>{
        this.allEmployee=res.data;
      },
        error => {
        console.log(error);
        }
        )
  }

  getEmployee(object: any) {
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
