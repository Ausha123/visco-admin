import {Component, OnInit} from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {DamageDetailsBottomSheetComponent} from "./inner-items/bottom-sheet/damage-details-bottom-sheet/damage-details-bottom-sheet.component";
import {PageEvent} from "@angular/material/paginator";
import {FormControl, FormGroup} from "@angular/forms";
import {CommonSnackBarService} from "../../../../../../../share/service/core/common-snack-bar-service.service";
import {debounceTime} from "rxjs";
import {DamagedDetailsService} from "../../../../../../../share/service/damaged-details/damaged-details.service";

@Component({
  selector: 'app-damaged-history',
  templateUrl: './damaged-history.component.html',
  styleUrls: ['./damaged-history.component.scss']
})
export class DamagedHistoryComponent implements OnInit {


  allDamagedDetailsArray: Array<any> = [];

  page: number | undefined = 0;
  pageSize: number | undefined = 10;
  pageSizeOptions = [5, 10, 20, 30, 50, 80, 100];
  dataCount = 0;
  pageEvent: PageEvent | undefined;

  searchText = '';


  searchForm = new FormGroup({
    searchText: new FormControl('')
  });

  constructor(
    private damagedDetailsService: DamagedDetailsService,
    private _bottomSheet: MatBottomSheet,
    private commonSnackBarService: CommonSnackBarService
  ) {
  }

  ngOnInit(): void {
    this.loadAllDamagedDetails();

    this.searchForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => {
        this.searchText = data.searchText;
        this.loadAllDamagedDetails();
      });
  }

  openBottomSheet(detail: any): void {
    this._bottomSheet.open(DamageDetailsBottomSheetComponent, {
      panelClass: ['common-bottom-sheet'],
      data: detail
    });
  }

  public getServerData(event?: PageEvent): any {
    this.pageSize = event?.pageSize;
    this.page = event?.pageIndex;
    console.log(event);
    this.loadAllDamagedDetails();
  }

  private loadAllDamagedDetails() {
    this.damagedDetailsService.getAllDamageDetailsBySearchText(this.page, this.pageSize, this.searchText).subscribe(response => {
      this.allDamagedDetailsArray = response.data.list;
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
