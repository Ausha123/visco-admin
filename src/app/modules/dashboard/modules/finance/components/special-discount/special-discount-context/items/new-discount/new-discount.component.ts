import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {SpecialDiscountService} from "../../../../../../../../share/service/special-discount/special-discount.service";
import {ProductService} from "../../../../../../../../share/service/product/product.service";
import {MatOptionSelectionChange} from "@angular/material/core";
import {CommonSnackBarService} from "../../../../../../../../share/service/core/common-snack-bar-service.service";
import {LoaderService} from "../../../../../../../../share/service/core/loader-service/loader.service";

@Component({
  selector: 'app-new-discount',
  templateUrl: './new-discount.component.html',
  styleUrls: ['./new-discount.component.scss']
})
export class NewDiscountComponent implements OnInit {

  constructor(private specialDiscountService: SpecialDiscountService, private productService: ProductService,
              private commonSnackBarService:CommonSnackBarService,public loadingService: LoaderService) {
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  products: any = [];
  object:any;

  newDiscountForm = new FormGroup({
    discountName: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    rate: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    startDate: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    endDate: new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    product:new FormControl(null,
      Validators.required)
  });

  // otherServiceExtraDetailsForm = new FormGroup({
  //   property: new FormControl(),
  //   value: new FormControl()
  // });
  openSnackBar(message: string, action: string) {
    this.commonSnackBarService.trigger(message, action, [
      10000, 'success-snack-bar-common',
      'end',
      'top'
    ]);
  }

  saveDiscount(formDirective:FormGroupDirective) {
    let discountName:string = this.newDiscountForm.get('discountName')?.value;
    let rate:number = this.newDiscountForm.get('rate')?.value;
    let startDate:string = this.newDiscountForm.get('startDate')?.value;
    let endDate:string = this.newDiscountForm.get('endDate')?.value;

    const data = {
      discountName: discountName,
      endDate: endDate,
      otherData: [
        {}
      ],
      rate: rate,
      startDate : startDate

    }

    this.specialDiscountService.saveSpecialDiscount(data, this.object.productId)
      .subscribe((res: any) => {
          console.log(res);
          if (res.code === 201) {
            this.clearFields(formDirective, this.newDiscountForm);
            this.openSnackBar(res.message, 'close');
          } else {
            this.openSnackBar('Something went wrong try again!', 'close');
          }
        },
        (error: any) => {
          console.log(error);
          this.openSnackBar(error.message,'close')
        }
      )
  }

  getAllProducts(){
    this.productService.getAllProductsIdAndName()
      .subscribe(res=>{
          console.log(res.data);
        this.products=res.data;

      },
        error => {
          console.log(error);
        }
        )
  }

  getProduct(object:any) {
    console.log(object);
    this.object=object;
  }


  clearFields(formDirective: FormGroupDirective, form: FormGroup): void {
    form.reset(); // Reset form data
    formDirective.resetForm(); // Reset the ugly validators
  }

}

  // addOtherData() {
  //   let property = this.otherServiceExtraDetailsForm.get('property')?.value;
  //   let value = this.otherServiceExtraDetailsForm.get('value')?.value;
  //   const data={
  //     property:property,
  //     value:value
  //   }

//     this.otherData.push(data);
//   }
// }
