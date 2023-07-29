import {Component, Inject, OnInit} from '@angular/core';
import {CommonSnackBarService} from "../../../../../../../../../../share/service/core/common-snack-bar-service.service";
import {BrandService} from "../../../../../../../../../../share/service/Brand/brand.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductTypeService} from "../../../../../../../../../../share/service/product-type/product-type.service";

@Component({
  selector: 'app-product-type-delete-pop-up',
  templateUrl: './product-type-delete-pop-up.component.html',
  styleUrls: ['./product-type-delete-pop-up.component.scss']
})
export class ProductTypeDeletePopUpComponent implements OnInit {

  constructor(
    private commonSnackBarService: CommonSnackBarService,
    private  productTypeService: ProductTypeService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public productTypeId: string,
  ) { }

  ngOnInit(): void {
  }

  deleteProductType() {
    this.productTypeService.deleteProductType(
      this.productTypeId
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
