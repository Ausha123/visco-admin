import { Component, OnInit } from '@angular/core';
import {RentalPaymentUpdatePopUpComponent} from "../../../../rental-payment/rental-payment-context/items/pop-up/rental-payment-update-pop-up/rental-payment-update-pop-up.component";
import {RentalPaymentDeletePopUpComponent} from "../../../../rental-payment/rental-payment-context/items/pop-up/rental-payment-delete-pop-up/rental-payment-delete-pop-up.component";
import {MatDialog} from "@angular/material/dialog";
import {SpecialDiscountUpdatePopUpComponent} from "../pop-up/special-discount-update-pop-up/special-discount-update-pop-up.component";
import {SpecialDiscountDeletePopUpComponent} from "../pop-up/special-discount-delete-pop-up/special-discount-delete-pop-up.component";
import {PayrollUpdatePopUpComponent} from "../../../../../../hr/components/payroll/payroll-context/items/pop-up/payroll-update-pop-up/payroll-update-pop-up.component";
import {PayrollDeletePopUpComponent} from "../../../../../../hr/components/payroll/payroll-context/items/pop-up/payroll-delete-pop-up/payroll-delete-pop-up.component";
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-special-discount-bottom-sheet',
  templateUrl: './special-discount-bottom-sheet.component.html',
  styleUrls: ['./special-discount-bottom-sheet.component.scss']
})
export class SpecialDiscountBottomSheetComponent implements OnInit {

  constructor(public dialog: MatDialog, private _bottomSheetRef:MatBottomSheetRef) { }

  ngOnInit(): void {
  }

  updatePopUp(event: MouseEvent): void {
    this.dialog.open(SpecialDiscountUpdatePopUpComponent, {
      width: '1000px',
      // data: this.details.typeId,
    });
    this.closeModal(event);
  }

  deletePopUp(event: MouseEvent): void {
    this.dialog.open(SpecialDiscountDeletePopUpComponent, {
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
