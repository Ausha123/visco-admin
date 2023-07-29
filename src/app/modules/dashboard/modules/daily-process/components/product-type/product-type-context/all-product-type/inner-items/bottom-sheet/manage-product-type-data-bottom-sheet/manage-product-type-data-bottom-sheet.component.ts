import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ProductTypeUpdatePopUpComponent} from "../../pop-up/product-type-update-pop-up/product-type-update-pop-up.component";
import {ProductTypeDeletePopUpComponent} from "../../pop-up/product-type-delete-pop-up/product-type-delete-pop-up.component";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {ProductTypeService} from "../../../../../../../../../../share/service/product-type/product-type.service";
import {CommonSnackBarService} from "../../../../../../../../../../share/service/core/common-snack-bar-service.service";

@Component({
  selector: 'app-manage-product-type-data-bottom-sheet',
  templateUrl: './manage-product-type-data-bottom-sheet.component.html',
  styleUrls: ['./manage-product-type-data-bottom-sheet.component.scss']
})
export class ManageProductTypeDataBottomSheetComponent implements OnInit {

  productTypeActiveState = true;

  constructor(
    private productTypeService: ProductTypeService,
    private commonSnackBarService: CommonSnackBarService,
    public dialog: MatDialog,
    private _bottomSheetRef: MatBottomSheetRef,
    @Inject(MAT_BOTTOM_SHEET_DATA) public productType: any) {
  }

  ngOnInit(): void {
  }

  updatePopUp(event: MouseEvent): void {
    this.dialog.open(ProductTypeUpdatePopUpComponent, {
      width: '1000px',
      data: this.productType,
    });
    this.closeModal(event);
  }

  deletePopUp(event: MouseEvent) {
    this.dialog.open(ProductTypeDeletePopUpComponent, {
      width: '1000px',
      data: this.productType.typeId,
    });
    this.closeModal(event);
  }

  changeActiveState(event: MouseEvent): void {
    if (this.productType?.activeState == true) {
      this.productTypeActiveState = false;
    }
    console.log(this.productTypeActiveState)
    this.productTypeService.changeActiveStateByProductTypeId(this.productType?.typeId, this.productTypeActiveState
    ).subscribe(response => {
      if (response.code === 204) {
        this.openSnackBar(response.message, 'close');
        location.reload();
      } else {
        this.openSnackBar('Something went wrong try again!', 'close');
      }
    }, error => {
      console.log(error);
    });
    this.closeModal(event);
  }

  closeModal(event: MouseEvent) {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }


  openSnackBar(message: string, action: string) {
    this.commonSnackBarService.trigger(message, action, [
      10000, 'success-snack-bar-common',
      'end',
      'top'
    ]);
  }

}
