import { Component, OnInit } from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {EmployeeBottemSheetComponent} from "../../../../../../Employee/employee-context/items/bottom-sheet/employee-bottem-sheet/employee-bottem-sheet.component";
import {MatDialog} from "@angular/material/dialog";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {PayrollBottomSheetComponent} from "../../../bottom-sheet/payroll-bottom-sheet/payroll-bottom-sheet.component";
import {PayrollService} from "../../../../../../../../../../share/service/payroll/payroll.service";
import {FormControl, FormGroup} from "@angular/forms";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-all-payroll',
  templateUrl: './all-payroll.component.html',
  styleUrls: ['./all-payroll.component.scss']
})
export class AllPayrollComponent implements OnInit {

  page: number | undefined = 0;
  pageSize: number | undefined = 10;
  pageSizeOptions = [5, 10, 20, 30, 50, 80, 100];
  dataCount = 0;
  pageEvent: PageEvent | undefined;
  activeState = 'active';
  searchText = '';
  startDate: string="";
  endDate: string="";
  allPayrolls:any=[];


  searchForm = new FormGroup({
    searchText: new FormControl(null),
  });


  range = new FormGroup({
    // @ts-ignore
    start: new FormControl<Date | null>(null),
    // @ts-ignore
    end: new FormControl<Date | null>(null),
  });

  constructor(private dialog: MatDialog,private bottomSheet: MatBottomSheet, private payRollService:PayrollService) { }

  ngOnInit(): void {
    this.searchForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => {
        this.searchText = data.searchText;
        this.getAllPayRolls();
      });
  }

  public getServerData(event?: PageEvent): any {
    this.pageSize = event?.pageSize;
    this.page = event?.pageIndex;
    console.log(event);
    this.getAllPayRolls();
  }

  manage(object:any) {
    this.bottomSheet.open(PayrollBottomSheetComponent);
    this.payRollService.setObject(object);
  }

  getAllPayRolls(){
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


    this.allPayrolls=[];
    this.payRollService.getAllPayroll(this.page,this.pageSize,this.searchText,tempEndDate,tempStartDate)
      .subscribe((res:any)=>{
        this.dataCount=res.data.dataCount;
        this.allPayrolls=res.data.list;
      },
        error => {
          console.log(error);
        }
        )
  }

  searchWithDate() {
    this.getAllPayRolls();
  }
}
