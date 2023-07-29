import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BrandService} from "../../../../../../../../../../share/service/Brand/brand.service";
import {CommonSnackBarService} from "../../../../../../../../../../share/service/core/common-snack-bar-service.service";

@Component({
  selector: 'app-brand-delete-pop-up',
  templateUrl: './brand-delete-pop-up.component.html',
  styleUrls: ['./brand-delete-pop-up.component.scss']
})
export class BrandDeletePopUpComponent implements OnInit {

  constructor(
    private commonSnackBarService: CommonSnackBarService,
    private  brandService: BrandService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public brandId: string,
  ) { }

  ngOnInit(): void {
  }

  deleteBrand() {
    this.brandService.deleteBrand(
      this.brandId
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
