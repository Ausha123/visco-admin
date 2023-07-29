import { Component, OnInit } from '@angular/core';
import {RentalPaymentService} from "../../../../../../../../../share/service/rental-payment/rentalPayment.service";
import {FormControl, FormGroup} from "@angular/forms";
import {PayableDataTypeDTO} from "../../../../../../../../../share/data/rental-payment/PaybleDataTypeDTO";
import {PayableTypesDataSource} from "../../../../../../../../../share/data/rental-payment/PaybleTypesDataSource";
import {RentalPaymentDTO} from "../../../../../../../../../share/dto/RentalPaymentDTO";

@Component({
  selector: 'app-rental-payment-update-pop-up',
  templateUrl: './rental-payment-update-pop-up.component.html',
  styleUrls: ['./rental-payment-update-pop-up.component.scss']
})
export class RentalPaymentUpdatePopUpComponent implements OnInit {
  updateRentalPaymentForm=new FormGroup({
    rentalPaymentDate:new FormControl(),
    discount:new FormControl(),
    tax:new FormControl(),
    extraCharges:new FormControl(),
    // extraChargesData:new FormControl(),
    payment:new FormControl(),
    balance:new FormControl(),
    paymentType:new FormControl()
  });

  payment_types: Array<PayableDataTypeDTO>=new PayableTypesDataSource().getAllSources();

  constructor(private rentalService:RentalPaymentService, ) { }

  ngOnInit(): void {
    let object:any=this.rentalService.getObject();
    console.log(object.rentalPaymentDate);
    this.updateRentalPaymentForm.get('rentalPaymentDate')?.setValue(object.rentalPaymentDate);
    this.updateRentalPaymentForm.get('discount')?.setValue(object.discount);
    this.updateRentalPaymentForm.get('tax')?.setValue(object.tax);
    this.updateRentalPaymentForm.get('extraCharges')?.setValue(object.extraCharges);
    this.updateRentalPaymentForm.get('payment')?.setValue(object.payment);
    this.updateRentalPaymentForm.get('balance')?.setValue(object.balance);
    this.updateRentalPaymentForm.get('paymentType')?.setValue(object.paymentType);

  }
  updateRentalPayment(){
    let rentalPaymentDate = this.updateRentalPaymentForm.get('rentalPaymentDate')?.value;
    let discount = this.updateRentalPaymentForm.get('discount')?.value;
    let tax = this.updateRentalPaymentForm.get('tax')?.value;
    let extraCharges = this.updateRentalPaymentForm.get('extraCharges')?.value;
    // let extraChargesData = this.newRentalPaymentForm.get('extraChargesData')?.value;
    let payment = this.updateRentalPaymentForm.get('payment')?.value;
    let balance = this.updateRentalPaymentForm.get('balance')?.value;
    let paymentType = this.updateRentalPaymentForm.get('paymentType')?.value;
    let object:any=this.rentalService.getObject();
    let payId:string=object.payId

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
    this.rentalService.updateRental(rental,payId)
      .subscribe(data=>{
        console.log(data);
        alert("Update Successfully....");
        location.reload();
      },
        error => {
          console.log(error);
        }
        )
  }
}
