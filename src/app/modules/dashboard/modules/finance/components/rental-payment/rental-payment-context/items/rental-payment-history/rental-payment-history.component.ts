import { Component, OnInit } from '@angular/core';
import {BottomSheetComponent} from "../bottom-sheet/bottom-sheet.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {PageEvent} from "@angular/material/paginator";
import {RentalPaymentService} from "../../../../../../../../share/service/rental-payment/rentalPayment.service";
import {FormControl, FormGroup} from "@angular/forms";
import {debounceTime, pipe, subscribeOn} from "rxjs";




@Component({
  selector: 'app-rental-payment-history',
  templateUrl: './rental-payment-history.component.html',
  styleUrls: ['./rental-payment-history.component.scss']
})
export class RentalPaymentHistoryComponent implements OnInit {

  constructor(private _bottomSheet: MatBottomSheet, private rentalPaymentService:RentalPaymentService) { }

  ngOnInit(): void {
    this.getRangeRentalPayments();
    setTimeout(() => {
      this.getRangeRentalPayments();
    }, 500);
  }

  page:number | undefined = 0;
  pageSize:number | undefined = 10;
  pageSizeOptions=[5,10,20,30,50,80,100];
  dataCount=0;
  pageEvent: PageEvent | undefined;
  activeState = 'inactive';
  searchText = '';
  startDate: string='';
  endDate:string='';
  rentalPaymentDataList:any=[];

  manageData(object:any) {
    this._bottomSheet.open(BottomSheetComponent);
    this.rentalPaymentService.setObject(object);
    console.log(object);
  }

  range = new FormGroup({
    // @ts-ignore
    start: new FormControl<Date | null>(null),
    // @ts-ignore
    end: new FormControl<Date | null>(null),
  });

  public getServerData(event?:PageEvent):any{
    console.log(event?.pageSize);
    this.pageSize=event?.pageSize;
    this.page=event?.pageIndex;
    this.getRangeRentalPayments();

  }

  public getRangeRentalPayments(){
    let tempStartDate: any = '';
    let tempEndDate: any = '';
    if (this.range.get('start')?.value === null) {
      let tempDate1 = new Date();
      tempDate1.setDate(tempDate1.getDate() - 365);
      tempStartDate = tempDate1.toISOString().split('T')[0];
    } else {
      tempStartDate = this.range.get('start')?.value;
      tempStartDate = tempStartDate.toISOString().split('T')[0];
    }

    if (this.range.get('end')?.value === null) {
      let tempDate2 = new Date();
      tempDate2.setDate(tempDate2.getDate() + 365);
      tempEndDate = tempDate2.toISOString().split('T')[0];
    } else {
      tempEndDate = this.range.get('end')?.value;
      tempEndDate = tempEndDate.toISOString().split('T')[0];
    }

    console.log(tempStartDate)
    console.log(tempEndDate)





    this.rentalPaymentDataList=[];
     this.rentalPaymentService.getRentalData(this.page,this.pageSize,tempEndDate,tempStartDate)
       .subscribe((res:any)=>{
           this.dataCount=res.data.dataCount;
           this.rentalPaymentDataList=res.data.list;
           console.log(res.data.list);
       },
         (error:any)=>{
            console.log(error);
          }
       )
  }
  searchWithDate() {
    this.getRangeRentalPayments();
  }

}
