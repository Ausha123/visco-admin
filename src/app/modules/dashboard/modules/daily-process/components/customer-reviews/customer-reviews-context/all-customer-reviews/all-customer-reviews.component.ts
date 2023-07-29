import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {FormControl, FormGroup} from "@angular/forms";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {CommonSnackBarService} from "../../../../../../../share/service/core/common-snack-bar-service.service";
import {debounceTime} from "rxjs";
import {CustomerReviewService} from "../../../../../../../share/service/customer-review/customer-review.service";

@Component({
  selector: 'app-all-customer-reviews',
  templateUrl: './all-customer-reviews.component.html',
  styleUrls: ['./all-customer-reviews.component.scss']
})
export class AllCustomerReviewsComponent implements OnInit {

  allCustomerReviewsArray: Array<any> = [];

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
    private customerReviewService: CustomerReviewService,
    private _bottomSheet: MatBottomSheet,
    private commonSnackBarService: CommonSnackBarService
  ) {
  }

  ngOnInit(): void {
    this.loadAllCustomerReviews();

    this.searchForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => {
        this.searchText = data.searchText;
        this.loadAllCustomerReviews();
      });
  }

  public getServerData(event?: PageEvent): any {
    this.pageSize = event?.pageSize;
    this.page = event?.pageIndex;
    console.log(event);
    this.loadAllCustomerReviews();
  }

  private loadAllCustomerReviews() {
    this.customerReviewService.getAllCustomerReviewsBySearchText(this.page, this.pageSize, this.searchText
    ).subscribe(response => {
      this.allCustomerReviewsArray = response.data.list;
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
