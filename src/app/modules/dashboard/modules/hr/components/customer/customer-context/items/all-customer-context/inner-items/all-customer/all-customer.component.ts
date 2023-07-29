import { Component, OnInit } from '@angular/core';
import {CustomerBottomSheetComponent} from "../../../bottom-sheet/customer-bottom-sheet/customer-bottom-sheet.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {PageEvent} from "@angular/material/paginator";
import {CustomerService} from "../../../../../../../../../../share/service/customer/customer.service";
import {FormControl, FormGroup} from "@angular/forms";
import {debounceTime} from "rxjs";


@Component({
  selector: 'app-all-customer',
  templateUrl: './all-customer.component.html',
  styleUrls: ['./all-customer.component.scss']
})
export class AllCustomerComponent implements OnInit {


  constructor(private bottomSheet: MatBottomSheet,private customerService:CustomerService) { }

  page: number | undefined = 0;
  pageSize: number | undefined = 10;
  pageSizeOptions = [5, 10, 20, 30, 50, 80, 100];
  dataCount = 0;
  pageEvent: PageEvent | undefined;
  activeState = 'active';
  searchText = '';
  startDate: string="";
  endDate: string="";
  allCustomers:any=[];

  searchForm = new FormGroup({
    searchText: new FormControl(null),
  });


  range = new FormGroup({
    // @ts-ignore
    start: new FormControl<Date | null>(null),
    // @ts-ignore
    end: new FormControl<Date | null>(null),
  });


  ngOnInit(): void {
    this.getAllCustomers();
    this.searchForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => {
        this.searchText = data.searchText;
        this.getAllCustomers();
      });
  }

  manage(object:any) {
    this.bottomSheet.open(  CustomerBottomSheetComponent);
    this.customerService.setObject(object);

  }



  public getServerData(event?: PageEvent): any {
    this.pageSize = event?.pageSize;
    this.page = event?.pageIndex;
    console.log(event);
    this.getAllCustomers();
  }

  getAllCustomers(){
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



    this.allCustomers=[];
    this.customerService.getAllCustomers(this.page,this.pageSize,this.searchText,tempStartDate,tempEndDate)
      .subscribe((res:any)=>{
        this.dataCount=res.data.dataCount;
        this.allCustomers=res.data.list;
        console.log(this.allCustomers);
      },
       error => {
         console.log(error);
       }
        )
  }

  searchWithDate() {
    this.getAllCustomers();
  }
}
