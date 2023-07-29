import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {UpdateFuelTypePopUpComponent} from "../../pop-up/update-fuel-type-pop-up/update-fuel-type-pop-up.component";
import {DeleteFuelTypePopUpComponent} from "../../pop-up/delete-fuel-type-pop-up/delete-fuel-type-pop-up.component";
import {CommonSnackBarService} from "../../../../../../../../../../share/service/core/common-snack-bar-service.service";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {FuelTypeService} from "../../../../../../../../../../share/service/fuel-type/fuel-type.service";

@Component({
  selector: 'app-fuel-type-bottom-sheet',
  templateUrl: './fuel-type-bottom-sheet.component.html',
  styleUrls: ['./fuel-type-bottom-sheet.component.scss']
})
export class FuelTypeBottomSheetComponent implements OnInit {

  fuelTypeActiveState = true;

  constructor(
    private fuelTypeService: FuelTypeService,
    private commonSnackBarService: CommonSnackBarService,
    public dialog: MatDialog,
    private _bottomSheetRef: MatBottomSheetRef,
    @Inject(MAT_BOTTOM_SHEET_DATA) public fuelType: any) {
  }

  ngOnInit(): void {
  }

  updatePopUp(event: MouseEvent): void {
    const dialogRef = this.dialog.open(UpdateFuelTypePopUpComponent, {
      width: '1000px',
      data: this.fuelType,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
    this.closeModal(event);
  }

  deletePopUp(event: MouseEvent) {
    this.dialog.open(DeleteFuelTypePopUpComponent, {
      width: 'auto',
      data: this.fuelType.fuelId,
    });
    this.closeModal(event);
  }

  changeActiveState(event: MouseEvent): void {
    if (this.fuelType?.activeState == true) {
      this.fuelTypeActiveState = false;
    }
    this.fuelTypeService.changeActiveStateByFuelTypeId(this.fuelType?.fuelId, this.fuelTypeActiveState
    ).subscribe(response => {
      console.log(response)
      if (response.code === 200) {
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

  // reloadPage() {
  //   setTimeout(()=>{
  //     window.location.reload();
  //   }, 100000);
  // }
}
