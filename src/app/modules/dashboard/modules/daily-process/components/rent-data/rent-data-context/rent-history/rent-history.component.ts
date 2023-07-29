import {Component, OnInit} from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {RentDataBottomSheetComponent} from "./inner-items/bottom-sheet/rent-data-bottom-sheet/rent-data-bottom-sheet.component";
import {FormControl, FormGroup} from "@angular/forms";
import {debounceTime} from "rxjs";
import {PageEvent} from "@angular/material/paginator";
import {RentDataService} from "../../../../../../../share/service/rent-data/rent-data.service";
import {CommonSnackBarService} from "../../../../../../../share/service/core/common-snack-bar-service.service";

@Component({
  selector: 'app-rent-history',
  templateUrl: './rent-history.component.html',
  styleUrls: ['./rent-history.component.scss']
})
export class RentHistoryComponent implements OnInit {

  allRentDataArray: Array<any> = [];
  page: number | undefined = 0;
  pageSize: number | undefined = 10;
  pageSizeOptions = [5, 10, 20, 30, 50, 80, 100];
  dataCount = 0;
  pageEvent: PageEvent | undefined;
  searchText = '';
  startDate = '';
  endDate = '';

  searchForm = new FormGroup({
    searchText: new FormControl('')
  });


  range = new FormGroup({
    // @ts-ignore
    start: new FormControl<Date | null>(null),
    // @ts-ignore
    end: new FormControl<Date | null>(null),
  });

  constructor(
    private _bottomSheet: MatBottomSheet,
    private rentDataService: RentDataService,
    private commonSnackBarService: CommonSnackBarService
  ) {
  }

  openBottomSheet(data: any): void {
    this._bottomSheet.open(RentDataBottomSheetComponent, {
      panelClass: ['common-bottom-sheet'],
      data: data
    });
  }

  ngOnInit(): void {
    this.loadAllRentData();

    this.searchForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => {
        this.searchText = data.searchText;
        this.searchWithDate();
      });

  }

  public getServerData(event?: PageEvent): any {
    this.pageSize = event?.pageSize;
    this.page = event?.pageIndex;
    console.log(event);
    this.loadAllRentData();
  }

  searchWithDate() {
    this.loadAllRentData();
  }

  private loadAllRentData() {
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

    this.rentDataService.getAllRentDataBySearchText(this.page, this.pageSize, this.searchText, tempStartDate, tempEndDate).subscribe(response => {
      this.allRentDataArray = response.data.list;
      this.dataCount = response.data.dataCount;
      console.log(response)
    }, error => {
      console.log(error);
      this.commonSnackBarService.warningSnackBar(
        'Something went wrong! please try again a while later.',
        'close',
        [5000, 'warning-snack-bar-common']
      );
    })
  }
}
