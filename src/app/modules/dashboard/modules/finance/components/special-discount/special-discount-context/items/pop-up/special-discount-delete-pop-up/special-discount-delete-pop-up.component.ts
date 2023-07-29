import { Component, OnInit } from '@angular/core';
import {SpecialDiscountService} from "../../../../../../../../../share/service/special-discount/special-discount.service";
import {CommonSnackBarService} from "../../../../../../../../../share/service/core/common-snack-bar-service.service";

@Component({
  selector: 'app-special-discount-delete-pop-up',
  templateUrl: './special-discount-delete-pop-up.component.html',
  styleUrls: ['./special-discount-delete-pop-up.component.scss']
})
export class SpecialDiscountDeletePopUpComponent implements OnInit {

  constructor(private specialDiscountService:SpecialDiscountService,
              private commonSnackBarService:CommonSnackBarService) { }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this.commonSnackBarService.trigger(message, action, [
      10000, 'success-snack-bar-common',
      'end',
      'top'
    ]);
  }

  deleteSpecialDiscount(){
    let object=this.specialDiscountService.getObject()
    let discountId=object.discountId;
    this.specialDiscountService.deleteSpecialDiscount(discountId)
      .subscribe((res:any)=>{
        // alert("Discount Delete Successfully...");
        this.openSnackBar(res.message,'close');
        location.reload();
      },
        error => {
          console.log(error);
          this.openSnackBar(error.message,'close');
        }
        )
  }
}
