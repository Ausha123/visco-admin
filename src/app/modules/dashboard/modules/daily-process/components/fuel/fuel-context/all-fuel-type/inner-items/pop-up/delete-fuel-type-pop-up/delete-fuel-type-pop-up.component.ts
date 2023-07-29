import {Component, Inject, OnInit} from '@angular/core';
import {CommonSnackBarService} from "../../../../../../../../../../share/service/core/common-snack-bar-service.service";
import {UnitTypeService} from "../../../../../../../../../../share/service/unit-type/unit-type.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FuelTypeService} from "../../../../../../../../../../share/service/fuel-type/fuel-type.service";

@Component({
  selector: 'app-delete-fuel-type-pop-up',
  templateUrl: './delete-fuel-type-pop-up.component.html',
  styleUrls: ['./delete-fuel-type-pop-up.component.scss']
})
export class DeleteFuelTypePopUpComponent implements OnInit {

  constructor(
    private commonSnackBarService: CommonSnackBarService,
    private  fuelTypeService: FuelTypeService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public fuelTypeId: string,
  ) { }

  ngOnInit(): void {
  }

  deleteFuelType() {
    this.fuelTypeService.deleteFuelType(
      this.fuelTypeId
    ).subscribe(response => {
      console.log(response)
      if (response.code === 201) {
        this.openSnackBar(response.message, 'close');
        location.reload();
      } else {
        this.openSnackBar('Something went wrong try again!', 'close');
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this.commonSnackBarService.trigger(message, action, [
      10000, 'success-snack-bar-common',
      'end',
      'top'
    ]);
  }
}
