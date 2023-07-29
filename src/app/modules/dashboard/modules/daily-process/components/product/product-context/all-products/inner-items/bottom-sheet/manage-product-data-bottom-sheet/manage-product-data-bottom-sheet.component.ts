import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ProductUpdatePopUpComponent} from "../../pop-up/product-update-pop-up/product-update-pop-up.component";
import {ProductDeletePopUpComponent} from "../../pop-up/product-delete-pop-up/product-delete-pop-up.component";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-manage-product-data-bottom-sheet',
  templateUrl: './manage-product-data-bottom-sheet.component.html',
  styleUrls: ['./manage-product-data-bottom-sheet.component.scss']
})
export class  ManageProductDataBottomSheetComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private _bottomSheetRef: MatBottomSheetRef,
    @Inject(MAT_BOTTOM_SHEET_DATA) public product: any
  ) {
  }

  ngOnInit(): void {
    console.log("Bottom Sheet  " + this.product.productId)
  }

  updatePopUp(event: MouseEvent): void {
    this.dialog.open(ProductUpdatePopUpComponent, {
      width: '1000px',
      data: this.product,
    });
    this.closeModal(event);
  }

  deletePopUp(event: MouseEvent): void {
    this.dialog.open(ProductDeletePopUpComponent, {
      width: 'auto',
      data: this.product.productId,
    });
    this.closeModal(event);
  }

  closeModal(event: MouseEvent) {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
