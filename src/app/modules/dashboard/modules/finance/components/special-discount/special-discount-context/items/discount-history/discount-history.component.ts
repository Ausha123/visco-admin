import {Component, OnInit} from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {SpecialDiscountBottomSheetComponent} from "../special-discount-bottom-sheet/special-discount-bottom-sheet.component";
import {PageEvent} from "@angular/material/paginator";
import {SpecialDiscountService} from "../../../../../../../../share/service/special-discount/special-discount.service";
import {FormControl, FormGroup} from "@angular/forms";
import {debounceTime} from "rxjs";

export interface allProductElement {
  discountName: string;
  rate: string;
  startDate: string;
  endDate: string;

}

const PRODUCT_DATA: allProductElement[] = [
  {discountName: 'scsas', rate: 'scas', startDate: 'scasc', endDate: 'sdcsd'},

];


@Component({
  selector: 'app-discount-history',
  templateUrl: './discount-history.component.html',
  styleUrls: ['./discount-history.component.scss']
})
export class DiscountHistoryComponent implements OnInit {
  displayedColumns: string[] = ['discountName', 'rate', 'startDate', 'endDate', 'manageData'];
  dataSource = PRODUCT_DATA;


  page: number | undefined = 0;
  pageSize: number | undefined = 10;
  pageSizeOptions = [5, 10, 20, 30, 50, 80, 100];
  dataCount = 0;
  pageEvent: PageEvent | undefined;
  activeState = 'all';
  searchText = '';
  startDate: string = "";
  endDate: string = "";
  discountData: any = [];

  constructor(private _bottomSheet: MatBottomSheet, private specialDiscountService: SpecialDiscountService) {
  }

  range = new FormGroup({
    // @ts-ignore
    start: new FormControl<Date | null>(null),
    // @ts-ignore
    end: new FormControl<Date | null>(null),
  });

  searchForm = new FormGroup({
    searchText: new FormControl(''),
  });

  ngOnInit(): void {
    this.getAllSpecialDiscount();
    this.searchForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => {
        this.searchText = data.searchText;
        console.log(this.searchText)
        this.getAllSpecialDiscount();
      });

  }

  manageData(object: any) {
    this._bottomSheet.open(SpecialDiscountBottomSheetComponent)
    this.specialDiscountService.setObject(object);
    console.log(object)
  }

  // public getServerData(event?:PageEvent):any{
  //   console.log(event?.pageSize);
  //   this.pageSize=event?.pageSize;
  //   this.page=event?.pageIndex;
  //   this.getAllSpecialDiscount();
  // }

  public getServerData(event?: PageEvent): any {
    this.pageSize = event?.pageSize;
    this.page = event?.pageIndex;
    console.log(event);
    this.getAllSpecialDiscount();
  }


  getAllSpecialDiscount() {
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



    this.discountData = [];
    this.specialDiscountService.getAllSpecialDiscount(this.activeState,this.page, this.pageSize, this.searchText, tempStartDate,tempEndDate)
      .subscribe(res => {
          this.dataCount = res.data.dataCount;
          this.discountData=res.data.list;
          console.log(this.discountData);
        },
        error => {
          console.log(error);
        }
      )
  }

  searchWithDate() {
    this.getAllSpecialDiscount();
  }


}
