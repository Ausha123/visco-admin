import { Component, OnInit } from '@angular/core';
import {EmployeePopUpComponent} from "../../../../../Employee/employee-context/items/pop-up/employee-update-pop-up/employee-pop-up.component";
import {MatDialog} from "@angular/material/dialog";
import {PayrollUpdatePopUpComponent} from "../../pop-up/payroll-update-pop-up/payroll-update-pop-up.component";
import {PayrollDeletePopUpComponent} from "../../pop-up/payroll-delete-pop-up/payroll-delete-pop-up.component";
import {UpdateDamageDetailsPopUpComponent} from "../../../../../../../daily-process/components/damaged-details/damaged-details-context/damaged-history/inner-items/pop-up/update-damage-details-pop-up/update-damage-details-pop-up.component";
import {DeleteDamageDetailsPopUpComponent} from "../../../../../../../daily-process/components/damaged-details/damaged-details-context/damaged-history/inner-items/pop-up/delete-damage-details-pop-up/delete-damage-details-pop-up.component";
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-payroll-bottom-sheet',
  templateUrl: './payroll-bottom-sheet.component.html',
  styleUrls: ['./payroll-bottom-sheet.component.scss']
})
export class PayrollBottomSheetComponent implements OnInit {

  constructor(private dialog: MatDialog, private _bottomSheetRef:MatBottomSheetRef) { }

  ngOnInit(): void {
  }

  updatePopUp(event: MouseEvent): void {
    this.dialog.open(PayrollUpdatePopUpComponent, {
      width: '1000px',
      // data: this.details.typeId,
    });
    this.closeModal(event);
  }

  deletePopUp(event: MouseEvent): void {
    this.dialog.open(PayrollDeletePopUpComponent, {
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
