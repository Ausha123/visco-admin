import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {SpecialDiscountService} from "../../../../../../../../../share/service/special-discount/special-discount.service";
import {CommonSnackBarService} from "../../../../../../../../../share/service/core/common-snack-bar-service.service";

@Component({
  selector: 'app-special-discount-update-pop-up',
  templateUrl: './special-discount-update-pop-up.component.html',
  styleUrls: ['./special-discount-update-pop-up.component.scss']
})
export class SpecialDiscountUpdatePopUpComponent implements OnInit {
  private object:any = this.specialDiscountService.getObject()
  constructor(private specialDiscountService:SpecialDiscountService,
              private commonSnackBarService:CommonSnackBarService) { }

  ngOnInit(): void {
    this.updateDiscountForm.get('discountName')?.setValue(this.object.discountName);
    this.updateDiscountForm.get('rate')?.setValue(this.object.rate);
    this.updateDiscountForm.get('startDate')?.setValue(this.object.startDate);
    this.updateDiscountForm.get('endDate')?.setValue(this.object.endDate);
  }

  updateDiscountForm = new FormGroup({
    discountName: new FormControl(),
    rate: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl()
  });


  openSnackBar(message: string, action: string) {
    this.commonSnackBarService.trigger(message, action, [
      10000, 'success-snack-bar-common',
      'end',
      'top'
    ]);
  }

  updateSpecialDiscount(){

    let discountName:string = this.updateDiscountForm.get('discountName')?.value;
    let rate:number = this.updateDiscountForm.get('rate')?.value;
    let startDate:string = this.updateDiscountForm.get('startDate')?.value;
    let endDate:string = this.updateDiscountForm.get('endDate')?.value;

    let discountId=this.object.discountId;

    const data = {
      discountName: discountName,
      endDate: endDate,
      otherData: [
        {}
      ],
      rate: rate,
      startDate : startDate

    }

    this.specialDiscountService.updateSpecialDiscount(data,discountId)
      .subscribe((res:any)=>{
        console.log(res);
        // alert("Discount Update Successfully...");
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
