import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {EmployeeService} from "../../../../../../../../../../share/service/employee/employee.service";
import {SalaryAdvanceService} from "../../../../../../../../../../share/service/salaryAdvance/salary-advance.service";
import {CommonSnackBarService} from "../../../../../../../../../../share/service/core/common-snack-bar-service.service";

@Component({
  selector: 'app-new-salary-advance',
  templateUrl: './new-salary-advance.component.html',
  styleUrls: ['./new-salary-advance.component.scss']
})
export class NewSalaryAdvanceComponent implements OnInit {
  private object: any;
  allEmployee: any=[];

  constructor(private employeeService:EmployeeService, private salaryAdvanceService:SalaryAdvanceService,
              private commonSnackBarService:CommonSnackBarService) { }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  private date=new Date()

  newSalaryAdvanceForm = new FormGroup({
    advance: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    date: new FormControl(this.date,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    note:new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
  });


  addSalaryAdvance(formDirective:FormGroupDirective){
    let advance:string = this.newSalaryAdvanceForm.get('advance')?.value;
    let date:string = this.newSalaryAdvanceForm.get('date')?.value;
    let note:string = this.newSalaryAdvanceForm.get('note')?.value;


    const data = {
      advance: advance,
      date: date,
      extraNote: note,
    }

    this.salaryAdvanceService.saveSalaryAdvance(data,this.object.propertyId)
      .subscribe((res: any) => {
          let s = res.message.substring(0,12);
          this.salaryAdvanceService.setId(s);
          console.log(res);
          // alert("Salary Advance save Successfully...");
          if (res.code === 201) {
            this.clearFields(formDirective, this.newSalaryAdvanceForm);
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
