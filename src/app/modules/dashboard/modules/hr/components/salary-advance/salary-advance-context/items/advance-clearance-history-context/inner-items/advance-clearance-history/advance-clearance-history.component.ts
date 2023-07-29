import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {MatDialog} from "@angular/material/dialog";
import {AdvanceClearenceService} from "../../../../../../../../../../share/service/advance-clearence/advance-clearence.service";
import {FormControl, FormGroup} from "@angular/forms";
import {debounceTime} from "rxjs";
import {AdvanceClearanceBottomSheetNewComponent} from "../../../advance-clearance-bottom-sheet-new/advance-clearance-bottom-sheet-new.component";

@Component({
  selector: 'app-advance-clearance-history',
  templateUrl: './advance-clearance-history.component.html',
  styleUrls: ['./advance-clearance-history.component.scss']
})
export class AdvanceClearanceHistoryComponent implements OnInit {

  page: number | undefined = 0;
  pageSize: number | undefined = 10;
  pageSizeOptions = [5, 10, 20, 30, 50, 80, 100];
  dataCount = 0;
  pageEvent: PageEvent | undefined;
  activeState = 'active';
  searchText = '';
  startDate: string = '';
  endDate: string = '';
  allAdvanceClearance: any = [];

  searchForm = new FormGroup({
    searchText: new FormControl(null),
  });

  range = new FormGroup({
    // @ts-ignore
    start: new FormControl<Date | null>(null),
    // @ts-ignore
    end: new FormControl<Date | null>(null),
  });


  constructor(private bottomSheet: MatBottomSheet, private dialog: MatDialog, private advanceClearanceService: AdvanceClearenceService) {
  }

  ngOnInit(): void {
    this.searchForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => {
        this.searchText = data.searchText;
        this.getAllAdvanceClearance();
      });
  }

  manage(object: any) {
    this.dialog.open(AdvanceClearanceBottomSheetNewComponent);
    this.advanceClearanceService.setObject(object);
  }

  public getServerData(event?: PageEvent): any {
    this.pageSize = event?.pageSize;
    this.page = event?.pageIndex;
    console.log(event);
    this.getAllAdvanceClearance();
    console.log(this.startDate)
  }

  public getAllAdvanceClearance() {

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
    console.log(tempEndDate + " " + tempStartDate);
    this.allAdvanceClearance = [];

    this.advanceClearanceService.getAllAdvanceClearance(this.page, this.pageSize, tempEndDate, tempStartDate)
      .subscribe((res: any) => {
          this.dataCount = res.data.dataCount;
          this.allAdvanceClearance=res.data.list;
        },
        error => {
          console.log(error);
        }
      )
  }
  searchWithDate() {
    this.getAllAdvanceClearance();
  }
}
