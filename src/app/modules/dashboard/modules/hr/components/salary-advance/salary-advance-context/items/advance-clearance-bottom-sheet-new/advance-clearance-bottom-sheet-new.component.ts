import { Component, OnInit } from '@angular/core';
import {AdvanceClearanceUpdatePopUpComponent} from "../pop-up/advance-clearance-update-pop-up/advance-clearance-update-pop-up.component";
import {AdvanceClearanceDeletePopUpComponent} from "../pop-up/advance-clearance-delete-pop-up/advance-clearance-delete-pop-up.component";
import {MatDialog} from "@angular/material/dialog";
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-advance-clearance-bottom-sheet-new',
  templateUrl: './advance-clearance-bottom-sheet-new.component.html',
  styleUrls: ['./advance-clearance-bottom-sheet-new.component.scss']
})
export class AdvanceClearanceBottomSheetNewComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  updatePopUp(event: MouseEvent): void {
    this.dialog.open(AdvanceClearanceUpdatePopUpComponent, {
      width: '1000px',
      // data: this.details.typeId,
    });
    this.closeModal(event);
  }

  deletePopUp(event: MouseEvent): void {
    this.dialog.open(AdvanceClearanceDeletePopUpComponent, {
      width: 'auto',
      // data: this.details.typeId,
    });
    this.closeModal(event);
  }

  closeModal(event: MouseEvent) {
    // this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
