import {Component, Inject, OnInit} from '@angular/core';
import {CommonSnackBarService} from "../../../../../../../../../../share/service/core/common-snack-bar-service.service";
import {UnitTypeService} from "../../../../../../../../../../share/service/unit-type/unit-type.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-unit-type-delete-pop-up',
  templateUrl: './unit-type-delete-pop-up.component.html',
  styleUrls: ['./unit-type-delete-pop-up.component.scss']
})
export class UnitTypeDeletePopUpComponent implements OnInit {

  constructor(
    private commonSnackBarService: CommonSnackBarService,
    private  unitTypeService: UnitTypeService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public unitTypeId: string,
  ) { }

  ngOnInit(): void {
  }

  deleteUnitType() {
    this.unitTypeService.deleteUnitType(
      this.unitTypeId
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
