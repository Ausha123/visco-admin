import {Component, Inject, OnInit} from '@angular/core';
import {CommonSnackBarService} from "../../../../../../../../../../share/service/core/common-snack-bar-service.service";
import {UnitTypeService} from "../../../../../../../../../../share/service/unit-type/unit-type.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MaintainDataService} from "../../../../../../../../../../share/service/maintain-data/maintain-data.service";

@Component({
  selector: 'app-delete-maintain-data-pop-up',
  templateUrl: './delete-maintain-data-pop-up.component.html',
  styleUrls: ['./delete-maintain-data-pop-up.component.scss']
})
export class DeleteMaintainDataPopUpComponent implements OnInit {

  constructor(
    private commonSnackBarService: CommonSnackBarService,
    private  maintainDataService: MaintainDataService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public maintainDataId: string,
  ) { }

  ngOnInit(): void {
  }

  deleteMaintainData() {
    this.maintainDataService.deleteMaintainData(
      this.maintainDataId
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
