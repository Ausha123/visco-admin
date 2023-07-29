import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {PayableDataTypeDTO} from "../../../../../../../../share/data/rental-payment/PaybleDataTypeDTO";
import {PayableTypesDataSource} from "../../../../../../../../share/data/rental-payment/PaybleTypesDataSource";
import {RentalPaymentService} from "../../../../../../../../share/service/rental-payment/rentalPayment.service";
import {RentalPaymentDTO} from "../../../../../../../../share/dto/RentalPaymentDTO";
import {CommonSnackBarService} from "../../../../../../../../share/service/core/common-snack-bar-service.service";
import {CustomerService} from "../../../../../../../../share/service/customer/customer.service";



@Component({
  selector: 'app-new-rental-payment',
  templateUrl: './new-rental-payment.component.html',
  styleUrls: ['./new-rental-payment.component.scss']
})
export class NewRentalPaymentComponent implements OnInit {
private rentalPaymentDataFromState:any;
private date=new Date()

  newRentalPaymentForm = new FormGroup({
    rentalPaymentDate:new FormControl(this.date,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    discount:new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    tax:new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    extraCharges:new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),

    payment:new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    balance:new FormControl(null,
      [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
    paymentType:new FormControl(null,
      [Validators.required]),
    rentId:new FormControl(null,
      [Validators.required]),
  });
  payment_types: Array<PayableDataTypeDTO>=new PayableTypesDataSource().getAllSources();
  customerNICS:any=[];
  constructor(private rentalPaymentService:RentalPaymentService,private commonSnackBarService:CommonSnackBarService
    ,private customerService:CustomerService) { }

  ngOnInit(): void {
    this.getAllCustomersNIC();
  }



  openSnackBar(message: string, action: string) {
    this.commonSnackBarService.trigger(message, action, [
      10000, 'success-snack-bar-common',
      'end',
      'top'
    ]);
  }

  submitData(formDirective:FormGroupDirective){

     let rentalPaymentDate = this.newRentalPaymentForm.get('rentalPaymentDate')?.value;
     let discount = this.newRentalPaymentForm.get('discount')?.value;
     let tax = this.newRentalPaymentForm.get('tax')?.value;
     let extraCharges = this.newRentalPaymentForm.get('extraCharges')?.value;
     // let extraChargesData = this.newRentalPaymentForm.get('extraChargesData')?.value;
     let payment = this.newRentalPaymentForm.get('payment')?.value;
     let balance = this.newRentalPaymentForm.get('balance')?.value;
     let paymentType = this.newRentalPaymentForm.get('paymentType')?.value;
      let rentId=this.newRentalPaymentForm.get('rentId')?.value;
      console.log(rentId);
    const rental:RentalPaymentDTO={
      rentalPaymentDate:rentalPaymentDate,
      discount:discount,
      tax:tax,
      extraCharges:extraCharges,
      // extraChargesData:extraChargesData,
      payment:payment,
      balance:balance,
      paymentType:paymentType
    }
     this.rentalPaymentService.saveRental(rental,rentId)
       .subscribe(response => {
         console.log(response)
         if (response.code === 201) {
           this.clearFields(formDirective, this.newRentalPaymentForm);
           this.openSnackBar(response.message, 'close');
         } else {
           this.openSnackBar('Something went wrong try again!', 'close');
         }
       })
       //   error => {
       //    console.log(error);
       //    this.openSnackBar(error.message,'close');
       //   }
       // )
  }

  getAllCustomersNIC(){
    this.customerService.getAllCustomersNIC()
      .subscribe((res:any)=>{
        this.customerNICS=res.data;
      },
        error => {
          console.log(error);
        })
  }

  clearFields(formDirective: FormGroupDirective, form: FormGroup): void {
    form.reset(); // Reset form data
    formDirective.resetForm(); // Reset the ugly validators
  }

}
