import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {UpdateMaintainDataPopUpComponent} from "../../pop-up/update-maintain-data-pop-up/update-maintain-data-pop-up.component";
import {DeleteMaintainDataPopUpComponent} from "../../pop-up/delete-maintain-data-pop-up/delete-maintain-data-pop-up.component";
import {UnitTypeService} from "../../../../../../../../../../share/service/unit-type/unit-type.service";
import {CommonSnackBarService} from "../../../../../../../../../../share/service/core/common-snack-bar-service.service";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-maintain-data-bottom-sheet',
  templateUrl: './maintain-data-bottom-sheet.component.html',
  styleUrls: ['./maintain-data-bottom-sheet.component.scss']
})
export class MaintainDataBottomSheetComponent implements OnInit {

  constructor(
    private unitTypeService: UnitTypeService,
    private commonSnackBarService: CommonSnackBarService,
    public dialog: MatDialog,
    private _bottomSheetRef: MatBottomSheetRef,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

  updatePopUp(event: MouseEvent): void {
    this.dialog.open(UpdateMaintainDataPopUpComponent, {
      width: '1000px',
      data: this.data,
    });
    this.closeModal(event);
  }

  deletePopUp(event: MouseEvent) {
    this.dialog.open(DeleteMaintainDataPopUpComponent, {
      width: 'auto',
      data: this.data.maintainId,
    });
    this.closeModal(event);
  }

  closeModal(event: MouseEvent) {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
