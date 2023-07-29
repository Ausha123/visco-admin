import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AdvanceClearenceService} from "../../../../../../../../../share/service/advance-clearence/advance-clearence.service";

@Component({
  selector: 'app-advance-clearance-update-pop-up',
  templateUrl: './advance-clearance-update-pop-up.component.html',
  styleUrls: ['./advance-clearance-update-pop-up.component.scss']
})
export class AdvanceClearanceUpdatePopUpComponent implements OnInit {

  constructor(private advanceClearanceService:AdvanceClearenceService) { }
  private object:any=this.advanceClearanceService.getObject();
  ngOnInit(): void {
    this.updateAdvanceClearanceForm.get('returnMoney')?.setValue(this.object.returnMoney);
    this.updateAdvanceClearanceForm.get('date')?.setValue(this.object.date);
  }

  updateAdvanceClearanceForm = new FormGroup({
    returnMoney: new FormControl(),
    date: new FormControl(),
  });


  updateAdvanceClearance() {
    let returnMoney = this.updateAdvanceClearanceForm.get('returnMoney')?.value;
    let date = this.updateAdvanceClearanceForm.get('date')?.value;

    const data={
      returnMoney:returnMoney,
      date:date
    }

    this.advanceClearanceService.updateAdvanceClearance(data,this.object.propertyId)
      .subscribe(res=>{
        alert("Advance Clearance Updated successfully...");
        location.reload();
      },
        error => {
        console.log(error);
        }
        )
  }
}
