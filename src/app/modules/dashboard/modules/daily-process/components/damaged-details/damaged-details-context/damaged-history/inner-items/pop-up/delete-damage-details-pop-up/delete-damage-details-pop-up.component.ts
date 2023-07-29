import {Component, Inject, OnInit} from '@angular/core';
import {CommonSnackBarService} from "../../../../../../../../../../share/service/core/common-snack-bar-service.service";
import {UnitTypeService} from "../../../../../../../../../../share/service/unit-type/unit-type.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DamagedDetailsService} from "../../../../../../../../../../share/service/damaged-details/damaged-details.service";

@Component({
  selector: 'app-delete-damage-details-pop-up',
  templateUrl: './delete-damage-details-pop-up.component.html',
  styleUrls: ['./delete-damage-details-pop-up.component.scss']
})
export class DeleteDamageDetailsPopUpComponent implements OnInit {

  constructor(
    private commonSnackBarService: CommonSnackBarService,
    private  damagedDetailsService: DamagedDetailsService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public damageId: string
  ) { }

  ngOnInit(): void {
  }

  deleteDamageDetail() {
    this.damagedDetailsService.deleteDamageDetail(
      this.damageId
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
