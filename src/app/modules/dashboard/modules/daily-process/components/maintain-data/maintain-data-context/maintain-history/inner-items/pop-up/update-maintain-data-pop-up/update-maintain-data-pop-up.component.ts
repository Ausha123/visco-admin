import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CommonSnackBarService} from "../../../../../../../../../../share/service/core/common-snack-bar-service.service";
import {ProductService} from "../../../../../../../../../../share/service/product/product.service";
import {MaintainDataService} from "../../../../../../../../../../share/service/maintain-data/maintain-data.service";

@Component({
  selector: 'app-update-maintain-data-pop-up',
  templateUrl: './update-maintain-data-pop-up.component.html',
  styleUrls: ['./update-maintain-data-pop-up.component.scss']
})
export class UpdateMaintainDataPopUpComponent implements OnInit {

  products: Array<any> = [];

  updateMaintainDataForm = new FormGroup({
    productId: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    cost: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    note: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
  });

  constructor(
    private productService: ProductService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private maintainDataService: MaintainDataService,
    private commonSnackBarService: CommonSnackBarService) {
  }

  ngOnInit(): void {
    this.loadProductTypeData()
    this.loadAllProducts();
  }

  loadProductTypeData() {
    console.log(this.data)
    if (this.data) {
      this.updateMaintainDataForm.patchValue({
        productId: this.data.productId,
        cost: this.data.cost,
        note: this.data.note
      })
    }
  }

  updateData(formDirective: FormGroupDirective) {
    let productId = this.updateMaintainDataForm.get('productId')?.value;
    let cost = this.updateMaintainDataForm.get('cost')?.value;
    let note = this.updateMaintainDataForm.get('note')?.value;


    this.maintainDataService.updateMaintainData(
      this.data.maintainId,
      productId,
      this.data.date,
      cost,
      note
    ).subscribe(response => {
      console.log(response)
      if (response.code === 204) {
        this.clearFields(formDirective, this.updateMaintainDataForm);
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

  private loadAllProducts() {
    this.productService.getAllProductsIdAndName().subscribe(response => {
      this.products = response.data;
      console.log(response)
      console.log(this.products)
    }, error => {
      console.log(error);
      alert('please try again!');
    })
  }

}
