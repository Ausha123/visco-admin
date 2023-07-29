import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {UpdateDamageDetailsPopUpComponent} from "../../pop-up/update-damage-details-pop-up/update-damage-details-pop-up.component";
import {DeleteDamageDetailsPopUpComponent} from "../../pop-up/delete-damage-details-pop-up/delete-damage-details-pop-up.component";
import {CommonSnackBarService} from "../../../../../../../../../../share/service/core/common-snack-bar-service.service";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-damage-details-bottom-sheet',
  templateUrl: './damage-details-bottom-sheet.component.html',
  styleUrls: ['./damage-details-bottom-sheet.component.scss']
})
export class DamageDetailsBottomSheetComponent implements OnInit {

  constructor(
    private commonSnackBarService: CommonSnackBarService,
    public dialog: MatDialog,
    private _bottomSheetRef: MatBottomSheetRef,
    @Inject(MAT_BOTTOM_SHEET_DATA) public details: any
  ) {
  }

  ngOnInit(): void {
    console.log(this.details)
  }

  updatePopUp(event: MouseEvent): void {
    this.dialog.open(UpdateDamageDetailsPopUpComponent, {
      width: '1000px',
      data: this.details,
    });
    this.closeModal(event);
  }

  deletePopUp(event: MouseEvent): void {
    this.dialog.open(DeleteDamageDetailsPopUpComponent, {
      width: 'auto',
      data: this.details.damageId,
    });
    this.closeModal(event);
  }

  closeModal(event: MouseEvent) {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
