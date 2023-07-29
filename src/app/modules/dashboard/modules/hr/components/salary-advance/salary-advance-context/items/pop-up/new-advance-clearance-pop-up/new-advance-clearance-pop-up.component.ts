import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {SalaryAdvanceService} from "../../../../../../../../../share/service/salaryAdvance/salary-advance.service";
import {AdvanceClearenceService} from "../../../../../../../../../share/service/advance-clearence/advance-clearence.service";

@Component({
  selector: 'app-new-advance-clearance-pop-up',
  templateUrl: './new-advance-clearance-pop-up.component.html',
  styleUrls: ['./new-advance-clearance-pop-up.component.scss']
})
export class NewAdvanceClearancePopUpComponent implements OnInit {

  constructor(private advanceClearanceService:AdvanceClearenceService,private salaryAdvanceService:SalaryAdvanceService) { }

  ngOnInit(): void {
  }

  newAdvanceClearanceForm = new FormGroup({
    returnMoney: new FormControl(),
    date: new FormControl(),
  });

  addAdvanceClearance(){
    let returnMoney:string = this.newAdvanceClearanceForm.get('returnMoney')?.value;
    let date:string = this.newAdvanceClearanceForm.get('date')?.value;
    let object= this.salaryAdvanceService.getObject();

    const data = {
      returnMoney: returnMoney,
      date: date,
    }

    console.log(object);
    this.advanceClearanceService.saveAdvanceClearence(data,object.propertyId)
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
