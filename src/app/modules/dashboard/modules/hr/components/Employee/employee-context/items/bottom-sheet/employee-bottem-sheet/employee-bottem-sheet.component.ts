import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EmployeePopUpComponent} from "../../pop-up/employee-update-pop-up/employee-pop-up.component";
import {EmployeeDeletePopUpComponent} from "../../pop-up/employee-delete-pop-up/employee-delete-pop-up.component";
import {UpdateDamageDetailsPopUpComponent} from "../../../../../../../daily-process/components/damaged-details/damaged-details-context/damaged-history/inner-items/pop-up/update-damage-details-pop-up/update-damage-details-pop-up.component";
import {DeleteDamageDetailsPopUpComponent} from "../../../../../../../daily-process/components/damaged-details/damaged-details-context/damaged-history/inner-items/pop-up/delete-damage-details-pop-up/delete-damage-details-pop-up.component";
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-employee-bottem-sheet',
  templateUrl: './employee-bottem-sheet.component.html',
  styleUrls: ['./employee-bottem-sheet.component.scss']
})
export class EmployeeBottemSheetComponent implements OnInit {


  constructor(private dialog: MatDialog, private _bottomSheetRef:MatBottomSheetRef) { }

  ngOnInit(): void {
  }

  updatePopUp(event: MouseEvent): void {
    this.dialog.open(EmployeePopUpComponent, {
      width: '1000px',
      // data: this.details.typeId,
    });
    this.closeModal(event);
  }

  deletePopUp(event: MouseEvent): void {
    this.dialog.open(EmployeeDeletePopUpComponent, {
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
