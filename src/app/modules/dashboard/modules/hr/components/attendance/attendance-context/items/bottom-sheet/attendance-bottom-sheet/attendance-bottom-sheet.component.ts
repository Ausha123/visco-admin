import { Component, OnInit } from '@angular/core';
import {EmployeeDeletePopUpComponent} from "../../../../../Employee/employee-context/items/pop-up/employee-delete-pop-up/employee-delete-pop-up.component";
import {MatDialog} from "@angular/material/dialog";
import {AttendanceDeletePopUpComponent} from "../../pop-up/attendance-delete-pop-up/attendance-delete-pop-up.component";
import {UpdateDamageDetailsPopUpComponent} from "../../../../../../../daily-process/components/damaged-details/damaged-details-context/damaged-history/inner-items/pop-up/update-damage-details-pop-up/update-damage-details-pop-up.component";
import {DeleteDamageDetailsPopUpComponent} from "../../../../../../../daily-process/components/damaged-details/damaged-details-context/damaged-history/inner-items/pop-up/delete-damage-details-pop-up/delete-damage-details-pop-up.component";
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-attendance-bottem-sheet',
  templateUrl: './attendance-bottom-sheet.component.html',
  styleUrls: ['./attendance-bottom-sheet.component.scss']
})
export class AttendanceBottomSheetComponent implements OnInit {

  constructor(private dialog: MatDialog,private _bottomSheetRef:MatBottomSheetRef) { }

  ngOnInit(): void {
  }

  deletePopUp(event: MouseEvent): void {
    this.dialog.open(AttendanceDeletePopUpComponent, {
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
