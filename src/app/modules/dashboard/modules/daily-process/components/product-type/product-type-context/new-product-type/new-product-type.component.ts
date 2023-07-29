import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {ProductTypeService} from "../../../../../../../share/service/product-type/product-type.service";
import {CommonSnackBarService} from "../../../../../../../share/service/core/common-snack-bar-service.service";

@Component({
  selector: 'app-new-product-type',
  templateUrl: './new-product-type.component.html',
  styleUrls: ['./new-product-type.component.scss']
})
export class NewProductTypeComponent implements OnInit {

  productTypeAvailability: string[] = ['Available', 'Not available'];

  newProductTypeForm = new FormGroup({
    productTypeName: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
  });

  constructor(private productTypeService:ProductTypeService,
              private commonSnackBarService: CommonSnackBarService
  ) {
  }

  ngOnInit(): void {
  }

  submitData(formDirective: FormGroupDirective) {
    let productTypeName = this.newProductTypeForm.get('productTypeName')?.value;

    this.productTypeService.newProductType(
      productTypeName
    ).subscribe(response => {
      console.log(response)
      if (response.code === 201) {
        this.clearFields(formDirective, this.newProductTypeForm);
        this.openSnackBar(response.message, 'close');
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
