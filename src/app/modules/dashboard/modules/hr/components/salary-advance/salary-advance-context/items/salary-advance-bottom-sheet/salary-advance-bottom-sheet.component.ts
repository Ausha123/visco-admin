import { Component, OnInit } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {SalaryDeletePopUpComponent} from "../pop-up/salary-delete-pop-up/salary-delete-pop-up.component";
import {MatDialog} from "@angular/material/dialog";
import {SalaryUpdatePopUpComponent} from "../pop-up/salary-update-pop-up/salary-update-pop-up.component";
import {NewAdvanceClearancePopUpComponent} from "../pop-up/new-advance-clearance-pop-up/new-advance-clearance-pop-up.component";
import {UpdateDamageDetailsPopUpComponent} from "../../../../../../daily-process/components/damaged-details/damaged-details-context/damaged-history/inner-items/pop-up/update-damage-details-pop-up/update-damage-details-pop-up.component";
import {DeleteDamageDetailsPopUpComponent} from "../../../../../../daily-process/components/damaged-details/damaged-details-context/damaged-history/inner-items/pop-up/delete-damage-details-pop-up/delete-damage-details-pop-up.component";

@Component({
  selector: 'app-salary-advance-bottom-sheet',
  templateUrl: './salary-advance-bottom-sheet.component.html',
  styleUrls: ['./salary-advance-bottom-sheet.component.scss']
})
export class SalaryAdvanceBottomSheetComponent implements OnInit {

  constructor(private dialog: MatDialog,private _bottomSheetRef:MatBottomSheetRef) { }

  ngOnInit(): void {
  }

  updatePopUp(event: MouseEvent): void {
    this.dialog.open(SalaryUpdatePopUpComponent, {
      width: '1000px',
      // data: this.details.typeId,
    });
    this.closeModal(event);
  }

  deletePopUp(event: MouseEvent): void {
    this.dialog.open(SalaryDeletePopUpComponent, {
      width: 'auto',
      // data: this.details.typeId,
    });
    this.closeModal(event);
  }

  newAdvanceClearance(event: MouseEvent): void {
    this.dialog.open(NewAdvanceClearancePopUpComponent, {
      width: 'auto',
      // data: this.details.typeId,
    });
    this.closeModal(event);
  }

  closeModal(event: MouseEvent) {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
