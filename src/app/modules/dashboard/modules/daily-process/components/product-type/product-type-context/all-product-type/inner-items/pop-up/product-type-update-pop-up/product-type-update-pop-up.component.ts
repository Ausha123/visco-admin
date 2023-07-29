import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CommonSnackBarService} from "../../../../../../../../../../share/service/core/common-snack-bar-service.service";
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {ProductTypeService} from "../../../../../../../../../../share/service/product-type/product-type.service";

@Component({
  selector: 'app-product-type-update-pop-up',
  templateUrl: './product-type-update-pop-up.component.html',
  styleUrls: ['./product-type-update-pop-up.component.scss']
})
export class ProductTypeUpdatePopUpComponent implements OnInit {

  updateProductTypeForm = new FormGroup({
    productTypeName: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
  });

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public productType: any,
    private productTypeService: ProductTypeService,
    private commonSnackBarService: CommonSnackBarService) {
  }

  ngOnInit(): void {
    this.loadProductTypeData()
  }

  loadProductTypeData() {
    console.log(this.productType)
    if (this.productType) {
      this.updateProductTypeForm.patchValue({
        productTypeName: this.productType.typeName
      })
    }
  }

  updateData(formDirective: FormGroupDirective) {
    let productTypeName = this.updateProductTypeForm.get('productTypeName')?.value;

    console.log("KKKK")

    this.productTypeService.updateProductType(this.productType.typeId,
      productTypeName
    ).subscribe(response => {
      console.log(response)
      if (response.code === 204) {
        this.clearFields(formDirective, this.updateProductTypeForm);
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

  clearFields(formDirective: FormGroupDirective, form: FormGroup): void {
    form.reset(); // Reset form data
    formDirective.resetForm(); // Reset the ugly validators
  }

}
