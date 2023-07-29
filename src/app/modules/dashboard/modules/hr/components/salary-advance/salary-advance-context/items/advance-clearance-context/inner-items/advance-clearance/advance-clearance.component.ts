import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AdvanceClearenceService} from "../../../../../../../../../../share/service/advance-clearence/advance-clearence.service";
import {SalaryAdvanceService} from "../../../../../../../../../../share/service/salaryAdvance/salary-advance.service";

@Component({
  selector: 'app-advance-clearance',
  templateUrl: './advance-clearance.component.html',
  styleUrls: ['./advance-clearance.component.scss']
})
export class AdvanceClearanceComponent implements OnInit {

  constructor(private advanceClearanceService:AdvanceClearenceService, private salaryAdvanceService:SalaryAdvanceService) { }

  ngOnInit(): void {
  }

  newAdvanceClearanceForm = new FormGroup({
    returnMoney: new FormControl(),
    date: new FormControl(),
  });

  addAdvanceClearance(){
    let returnMoney:string = this.newAdvanceClearanceForm.get('returnMoney')?.value;
    let date:string = this.newAdvanceClearanceForm.get('date')?.value;
    let id=this.salaryAdvanceService.getId();

    const data = {
      returnMoney: returnMoney,
      date: date,
    }

    this.advanceClearanceService.saveAdvanceClearence(data,id)
      .subscribe((res: any) => {
          console.log(res);
          alert("Salary Advance save Successfully...");
        },
        (error: any) => {
          console.log(error);
        }
      )
  }
}
