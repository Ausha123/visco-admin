import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RentalPaymentUpdatePopUpComponent} from "../pop-up/rental-payment-update-pop-up/rental-payment-update-pop-up.component";
import {RentalPaymentDeletePopUpComponent} from "../pop-up/rental-payment-delete-pop-up/rental-payment-delete-pop-up.component";
import {PayrollUpdatePopUpComponent} from "../../../../../../hr/components/payroll/payroll-context/items/pop-up/payroll-update-pop-up/payroll-update-pop-up.component";
import {PayrollDeletePopUpComponent} from "../../../../../../hr/components/payroll/payroll-context/items/pop-up/payroll-delete-pop-up/payroll-delete-pop-up.component";
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";


@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent implements OnInit {

  constructor(public dialog: MatDialog, private _bottomSheetRef:MatBottomSheetRef) { }

  ngOnInit(): void {
  }

  updatePopUp(event: MouseEvent): void {
    this.dialog.open(RentalPaymentUpdatePopUpComponent, {
      width: '1000px',
      // data: this.details.typeId,
    });
    this.closeModal(event);
  }

  deletePopUp(event: MouseEvent): void {
    this.dialog.open(RentalPaymentDeletePopUpComponent, {
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
