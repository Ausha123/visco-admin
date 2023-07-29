import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../../../../../../share/service/customer/customer.service";
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {CommonSnackBarService} from "../../../../../../../share/service/core/common-snack-bar-service.service";
import {RentDataService} from "../../../../../../../share/service/rent-data/rent-data.service";
import {rentProductsDTO} from "../../../../../../../share/dto/rentProductsDTO";
import {ProductService} from "../../../../../../../share/service/product/product.service";

@Component({
  selector: 'app-new-rent-data',
  templateUrl: './new-rent-data.component.html',
  styleUrls: ['./new-rent-data.component.scss']
})
export class NewRentDataComponent implements OnInit {

  customerArray: Array<any> = [];
  customerName = '';

  newRentDataForm = new FormGroup({
    customerNIC: new FormControl(null,
      [Validators.required
      ])
  });

  rentDetailsArray: Array<rentProductsDTO> = [];

  products: Array<any> = [];
  rentalForm = new FormGroup({
    productId: new FormControl(),
    quantity: new FormControl(),
    returnNote: new FormControl(),
  });

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private rentDataService: RentDataService,
    private commonSnackBarService: CommonSnackBarService
  ) {
  }

  ngOnInit(): void {
    this.loadAllCustomer();
    this.loadAllProducts();
  }

  submitData(formDirective: FormGroupDirective) {
    let customerNIC = this.newRentDataForm.get('customerNIC')?.value;
    console.log(rentProductsDTO)
    this.rentDataService.newRentData(
      customerNIC,
      this.rentDetailsArray,
      new Date()
    ).subscribe(response => {
      console.log(response)
      if (response.code === 201) {
        this.clearFields(formDirective, this.newRentDataForm);
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

  addRentDetails(formDirective: FormGroupDirective) {
    if (!this.isExistsDetail(this.rentalForm.get('productId')?.value)) {
      this.rentDetailsArray.push(
        new rentProductsDTO(
          this.rentalForm.get('productId')?.value,
          this.rentalForm.get('quantity')?.value,
          this.rentalForm.get('returnNote')?.value
        )
      );
      this.clearFields(formDirective, this.rentalForm);
    } else {
      this.commonSnackBarService.warningSnackBar(
        'Something went wrong! please try again a while later.',
        'close',
        [5000, 'warning-snack-bar-common']
      );
    }
  }

  isExistsDetail(productId: string): boolean {
    for (let tempDetail of this.rentDetailsArray) {
      if (tempDetail.productId === productId) {
        return true;
      }
    }
    return false;
  }

  removeContact(id: number) {
    this.rentDetailsArray.splice(id, 1);
  }

  private loadAllCustomer() {
    this.customerService.getAllCustomerIds().subscribe(response => {
      this.customerArray = response.data;
      console.log(this.customerArray)
    }, error => {
      console.log(error);
      alert('please try again!');
    })
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

  customerDetails(customer: any) {
    this.customerName = customer.name;
  }
}
