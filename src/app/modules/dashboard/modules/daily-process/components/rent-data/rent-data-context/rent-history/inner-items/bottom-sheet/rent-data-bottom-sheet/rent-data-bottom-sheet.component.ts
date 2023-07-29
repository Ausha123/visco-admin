import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {UpdateRentDataPopUpComponent} from "../../pop-up/update-rent-data-pop-up/update-rent-data-pop-up.component";
import {DeleteRentDataPopUpComponent} from "../../pop-up/delete-rent-data-pop-up/delete-rent-data-pop-up.component";
import {NewDamagedDataComponent} from "../../pop-up/new-damaged-data/new-damaged-data.component";
import {ViewRentDataPopUpComponent} from "../../pop-up/view-rent-data-pop-up/view-rent-data-pop-up.component";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-rent-data-bottom-sheet',
  templateUrl: './rent-data-bottom-sheet.component.html',
  styleUrls: ['./rent-data-bottom-sheet.component.scss']
})
export class RentDataBottomSheetComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private _bottomSheetRef: MatBottomSheetRef,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

  viewRentData(event: MouseEvent): void {
    this.dialog.open(ViewRentDataPopUpComponent, {
      width: '1000px',
      data: this.data,
    });
    this.closeModal(event);
  }


  updatePopUp(event: MouseEvent) {
    this.dialog.open(UpdateRentDataPopUpComponent, {
      width: '1000px',
      data: this.data,
    });
    this.closeModal(event);
  }

  deletePopUp(event: MouseEvent) {
    this.dialog.open(DeleteRentDataPopUpComponent, {
      width: '1000px',
      data: this.data.rentId
    });
  }

  newDamagedData(event: MouseEvent) {
    this.dialog.open(NewDamagedDataComponent, {
      width: '1000px',
      data: this.data.rentId
    });
  }


  closeModal(event: MouseEvent) {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
