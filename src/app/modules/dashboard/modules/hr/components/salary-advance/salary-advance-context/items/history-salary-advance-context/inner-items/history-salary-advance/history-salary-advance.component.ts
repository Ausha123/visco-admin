import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {SalaryAdvanceBottomSheetComponent} from "../../../salary-advance-bottom-sheet/salary-advance-bottom-sheet.component";
import {SalaryAdvanceService} from "../../../../../../../../../../share/service/salaryAdvance/salary-advance.service";
import {FormControl, FormGroup} from "@angular/forms";
import {debounceTime} from "rxjs";


@Component({
  selector: 'app-history-salary-advance',
  templateUrl: './history-salary-advance.component.html',
  styleUrls: ['./history-salary-advance.component.scss']
})
export class HistorySalaryAdvanceComponent implements OnInit {

  page: number | undefined = 0;
  pageSize: number | undefined = 10;
  pageSizeOptions = [5, 10, 20, 30, 50, 80, 100];
  dataCount = 0;
  pageEvent: PageEvent | undefined;
  activeState = 'active';
  searchText = '';
  startDate: any = '';
  endDate: any = '';
  allSalaryAdvance: any = [];
  searchForm = new FormGroup({
    searchText: new FormControl(null),
  });
  range = new FormGroup({
    // @ts-ignore
    start: new FormControl<Date | null>(null),
    // @ts-ignore
    end: new FormControl<Date | null>(null),
  });

  constructor(private bottomSheet: MatBottomSheet, private salaryAdvanceService: SalaryAdvanceService) {
  }

  ngOnInit(): void {

    this.getAllSalaryAdvance();

    this.searchForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => {
        this.searchText = data.searchText;
        this.getAllSalaryAdvance();
      });
  }

  manage(object: any) {
    this.bottomSheet.open(SalaryAdvanceBottomSheetComponent);
    this.salaryAdvanceService.setObject(object);
  }

  public getServerData(event?: PageEvent): any {
    this.pageSize = event?.pageSize;
    this.page = event?.pageIndex;
    console.log(event);
    this.getAllSalaryAdvance();
  }

  getAllSalaryAdvance() {
    let tempStartDate: any = '';
    let tempEndDate: any = '';
    if (this.range.get('start')?.value === null) {
      let tempDate1 = new Date();
      tempDate1.setDate(tempDate1.getDate() - 1);
      tempStartDate = tempDate1.toISOString().split('T')[0];
    } else {
      tempStartDate = this.range.get('start')?.value;
      tempStartDate = tempStartDate.toISOString().split('T')[0];
    }

    if (this.range.get('end')?.value === null) {
      let tempDate2 = new Date();
      tempDate2.setDate(tempDate2.getDate() + 1);
      tempEndDate = tempDate2.toISOString().split('T')[0];
    } else {
      tempEndDate = this.range.get('end')?.value;
      tempEndDate = tempEndDate.toISOString().split('T')[0];
    }

    console.log(tempStartDate)
    console.log(tempEndDate)

    this.allSalaryAdvance = [];
    this.salaryAdvanceService.getAllSalaryAdvance(this.page, this.pageSize, this.searchText, tempEndDate, tempStartDate)
      .subscribe((res: any) => {
          this.dataCount = res.data.dataCount;
          this.allSalaryAdvance=res.data.list;
        },
        error => {
          console.log(error);
        }
      )
  }
  searchWithDate() {
    this.getAllSalaryAdvance();
  }
}
