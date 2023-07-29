import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {SalaryAdvanceService} from "../../../../../../../../../share/service/salaryAdvance/salary-advance.service";

@Component({
  selector: 'app-salary-update-pop-up',
  templateUrl: './salary-update-pop-up.component.html',
  styleUrls: ['./salary-update-pop-up.component.scss']
})
export class SalaryUpdatePopUpComponent implements OnInit {
  constructor(private salaryAdvanceService:SalaryAdvanceService) { }

  ngOnInit(): void {
    this.updateSalaryAdvanceForm.get('advance')?.setValue(this.object.advance);
    this.updateSalaryAdvanceForm.get('date')?.setValue(this.object.date);
    this.updateSalaryAdvanceForm.get('note')?.setValue(this.object.extraNote);
  }
  private object:any=this.salaryAdvanceService.getObject();

  updateSalaryAdvanceForm = new FormGroup({
    advance: new FormControl(),
    date: new FormControl(),
    note: new FormControl()
  });

  updateSalaryAdvance() {
    let advance:string = this.updateSalaryAdvanceForm.get('advance')?.value;
    let date:string = this.updateSalaryAdvanceForm.get('date')?.value;
    let note:string = this.updateSalaryAdvanceForm.get('note')?.value;

    const data = {
      advance: advance,
      date: date,
      extraNote: note,
    }

    this.salaryAdvanceService.updateSalaryAdvance(data,this.object.propertyId)
      .subscribe((res: any) => {
          console.log(res);
          alert("Salary Advance update Successfully...");
          location.reload();
        },
        (error: any) => {
          console.log(error);
        }
      )
  }
}
