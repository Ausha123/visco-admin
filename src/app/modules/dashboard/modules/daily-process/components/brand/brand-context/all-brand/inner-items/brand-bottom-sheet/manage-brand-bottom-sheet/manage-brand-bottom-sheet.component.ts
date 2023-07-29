import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {BrandUpdatePopUpComponent} from "../../brand-pop-up/brand-update-pop-up/brand-update-pop-up.component";
import {BrandDeletePopUpComponent} from "../../brand-pop-up/brand-delete-pop-up/brand-delete-pop-up.component";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {BrandService} from "../../../../../../../../../../share/service/Brand/brand.service";
import {CommonSnackBarService} from "../../../../../../../../../../share/service/core/common-snack-bar-service.service";

@Component({
  selector: 'app-manage-brand-bottom-sheet',
  templateUrl: './manage-brand-bottom-sheet.component.html',
  styleUrls: ['./manage-brand-bottom-sheet.component.scss']
})
export class ManageBrandBottomSheetComponent implements OnInit {

  brandActiveState = true;

  constructor(
    private brandService: BrandService,
    private commonSnackBarService: CommonSnackBarService,
    private _bottomSheet: MatBottomSheet,
    public dialog: MatDialog,
    private _bottomSheetRef: MatBottomSheetRef,
    @Inject(MAT_BOTTOM_SHEET_DATA) public brand: any) {
  }

  ngOnInit(): void {
  }

  updatePopUp(event: MouseEvent): void {
    this.dialog.open(BrandUpdatePopUpComponent, {
      width: '1000px',
      data: this.brand,
    });
    this.closeModal(event);
  }

  deletePopUp(event: MouseEvent) {
    this.dialog.open(BrandDeletePopUpComponent, {
      width: '1000px',
      data: this.brand.brandId,
    });
    this.closeModal(event);
  }

  changeActiveState(event: MouseEvent): void {
    if (this.brand?.activeState == true) {
      this.brandActiveState = false;
    }
    console.log(this.brandActiveState)
    this.brandService.changeActiveStateByBrandId(this.brand?.brandId, this.brandActiveState
    ).subscribe(response => {
      console.log(response)
      if (response.code === 204) {
        this.openSnackBar(response.message, 'close');
        location.reload();
      }
    }, error => {
      console.log(error);
    });
  }

  openSnackBar(message: string, action: string) {
    this.commonSnackBarService.trigger(message, action, [
      10000, 'success-snack-bar-common',
      'end',
      'top'
    ]);
  }

  closeModal(event: MouseEvent) {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
