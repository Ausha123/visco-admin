import {Component, Inject, OnInit} from '@angular/core';
import {CommonSnackBarService} from "../../../../../../../../../../share/service/core/common-snack-bar-service.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductService} from "../../../../../../../../../../share/service/product/product.service";

@Component({
  selector: 'app-product-delete-pop-up',
  templateUrl: './product-delete-pop-up.component.html',
  styleUrls: ['./product-delete-pop-up.component.scss']
})
export class ProductDeletePopUpComponent implements OnInit {

  constructor(
    private commonSnackBarService: CommonSnackBarService,
    private productService: ProductService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public productId: string,
  ) {
  }

  ngOnInit(): void {
  }

  deleteProduct() {
    this.productService.deleteProduct(
      this.productId
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
