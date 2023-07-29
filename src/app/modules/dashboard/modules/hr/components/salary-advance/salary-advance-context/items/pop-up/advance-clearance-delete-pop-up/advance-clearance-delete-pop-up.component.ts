import { Component, OnInit } from '@angular/core';
import {AdvanceClearenceService} from "../../../../../../../../../share/service/advance-clearence/advance-clearence.service";
import {AdvanceClearanceComponent} from "../../advance-clearance-context/inner-items/advance-clearance/advance-clearance.component";
import {AdvanceClearanceHistoryComponent} from "../../advance-clearance-history-context/inner-items/advance-clearance-history/advance-clearance-history.component";

@Component({
  selector: 'app-advance-clearance-delete-pop-up',
  templateUrl: './advance-clearance-delete-pop-up.component.html',
  styleUrls: ['./advance-clearance-delete-pop-up.component.scss']
})
export class AdvanceClearanceDeletePopUpComponent implements OnInit {

  constructor(private advanceClearanceService:AdvanceClearenceService) { }

  ngOnInit(): void {
  }

  deleteAdvanceClearance(){
    let object = this.advanceClearanceService.getObject();
    this.advanceClearanceService.deleteAdvanceClearance(object.propertyId)
      .subscribe(data=>{
        alert("Advance Clearance Delete successfully...");
          location.reload();
        // this.advanceClearanceHistoryTs.getAllAdvanceClearance();
      },
        error => {
          console.log(error);
        }
        )
  }
}
