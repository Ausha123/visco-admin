import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {UnitTypeUpdatePopUpComponent} from "../../pop-up/unit-type-update-pop-up/unit-type-update-pop-up.component";
import {UnitTypeDeletePopUpComponent} from "../../pop-up/unit-type-delete-pop-up/unit-type-delete-pop-up.component";
import {ProductTypeService} from "../../../../../../../../../../share/service/product-type/product-type.service";
import {CommonSnackBarService} from "../../../../../../../../../../share/service/core/common-snack-bar-service.service";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {ProductTypeUpdatePopUpComponent} from "../../../../../../product-type/product-type-context/all-product-type/inner-items/pop-up/product-type-update-pop-up/product-type-update-pop-up.component";
import {ProductTypeDeletePopUpComponent} from "../../../../../../product-type/product-type-context/all-product-type/inner-items/pop-up/product-type-delete-pop-up/product-type-delete-pop-up.component";
import {UnitTypeService} from "../../../../../../../../../../share/service/unit-type/unit-type.service";

@Component({
  selector: 'app-manage-unit-type-data-bottom-sheet',
  templateUrl: './manage-unit-type-data-bottom-sheet.component.html',
  styleUrls: ['./manage-unit-type-data-bottom-sheet.component.scss']
})
export class ManageUnitTypeDataBottomSheetComponent implements OnInit {

  unitTypeActiveState = true;

  constructor(
    private unitTypeService: UnitTypeService,
    private commonSnackBarService: CommonSnackBarService,
    public dialog: MatDialog,
    private _bottomSheetRef: MatBottomSheetRef,
    @Inject(MAT_BOTTOM_SHEET_DATA) public unitType: any
  ) {
  }

  ngOnInit(): void {
  }

  updatePopUp(event: MouseEvent): void {
    this.dialog.open(UnitTypeUpdatePopUpComponent, {
      width: '1000px',
      data: this.unitType,
    });
    this.closeModal(event);
  }

  deletePopUp(event: MouseEvent) {
    this.dialog.open(UnitTypeDeletePopUpComponent, {
      width: 'auto',
      data: this.unitType.typeId,
    });
    this.closeModal(event);
  }

  changeActiveState(event: MouseEvent): void {
    if (this.unitType?.activeState == true) {
      this.unitTypeActiveState = false;
    }
    console.log(this.unitTypeActiveState)
    this.unitTypeService.changeActiveStateByUnitTypeId(this.unitType?.unitId, this.unitTypeActiveState
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
