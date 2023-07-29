import { Component, OnInit } from '@angular/core';
import {RentalPaymentService} from "../../../../../../../../../share/service/rental-payment/rentalPayment.service";
import {CommonSnackBarService} from "../../../../../../../../../share/service/core/common-snack-bar-service.service";

@Component({
  selector: 'app-rental-payment-delete-pop-up',
  templateUrl: './rental-payment-delete-pop-up.component.html',
  styleUrls: ['./rental-payment-delete-pop-up.component.scss']
})
export class RentalPaymentDeletePopUpComponent implements OnInit {

  constructor(private rentalPaymentService:RentalPaymentService, private commonSnackBarService:CommonSnackBarService) { }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this.commonSnackBarService.trigger(message, action, [
      10000, 'success-snack-bar-common',
      'end',
      'top'
    ]);
  }

  deleteRentalPayment(){
    let object:any=this.rentalPaymentService.getObject();
    this.rentalPaymentService.deleteRental(object.payId)
      .subscribe((res:any)=>{
        // alert("Delete Success..")
        this.openSnackBar(res.message,'close');
        location.reload();
      },
        (error:any)=>{
          console.log(error);
          this.openSnackBar(error.message,'close');
        }
      )
  }
}
