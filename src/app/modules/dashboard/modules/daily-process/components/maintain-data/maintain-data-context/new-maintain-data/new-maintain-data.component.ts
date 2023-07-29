import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../../../../../share/service/product/product.service";
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {CommonSnackBarService} from "../../../../../../../share/service/core/common-snack-bar-service.service";
import {MaintainDataService} from "../../../../../../../share/service/maintain-data/maintain-data.service";
import {rentProductsDTO} from "../../../../../../../share/dto/rentProductsDTO";

@Component({
  selector: 'app-new-maintain-data',
  templateUrl: './new-maintain-data.component.html',
  styleUrls: ['./new-maintain-data.component.scss']
})
export class NewMaintainDataComponent implements OnInit {


  products: Array<any> = [];

  newMaintainDataForm = new FormGroup({
    productId: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    cost: new FormControl(null,
      [Validators.required
      ]),
    note: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
  });

  constructor(
    private productService: ProductService,
    private maintainDataService: MaintainDataService,
    private commonSnackBarService: CommonSnackBarService) {
  }

  ngOnInit(): void {
    this.loadAllProducts();
    console.log(this.products)
  }

  submitData(formDirective: FormGroupDirective) {
    let productId = this.newMaintainDataForm.get('productId')?.value;
    let cost = this.newMaintainDataForm.get('cost')?.value;
    let note = this.newMaintainDataForm.get('note')?.value;

    this.maintainDataService.newMaintainData(
      productId,
      cost,
      new Date(),
      note
    ).subscribe(response => {
      console.log(response)
      if (response.code === 201) {
        this.clearFields(formDirective, this.newMaintainDataForm);
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
