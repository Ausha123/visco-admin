import {Component, OnInit} from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {ManageBrandBottomSheetComponent} from "./inner-items/brand-bottom-sheet/manage-brand-bottom-sheet/manage-brand-bottom-sheet.component";
import {PageEvent} from "@angular/material/paginator";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonSnackBarService} from "../../../../../../../share/service/core/common-snack-bar-service.service";
import {debounceTime} from "rxjs";
import {BrandService} from "../../../../../../../share/service/Brand/brand.service";

@Component({
  selector: 'app-all-brand',
  templateUrl: './all-brand.component.html',
  styleUrls: ['./all-brand.component.scss']
})
export class AllBrandComponent implements OnInit {
  allBrandsArray: Array<any> = [];
  page: number | undefined = 0;
  pageSize: number | undefined = 10;
  pageSizeOptions = [5, 10, 20, 30, 50, 80, 100];
  dataCount = 0;
  pageEvent: PageEvent | undefined;
  activeState = 'active';
  searchText = '';
  brandActiveState = 'all';
  availability: string[] = ['All', 'Available', 'Unavailable'];

  searchForm = new FormGroup({
    searchText: new FormControl(''),
    activeState: new FormControl(null,
      [Validators.required]),

  });

  constructor(
    private brandService: BrandService,
    private _bottomSheet: MatBottomSheet,
    private commonSnackBarService: CommonSnackBarService
  ) {
  }

  openBottomSheet(brand: any): void {
    this._bottomSheet.open(ManageBrandBottomSheetComponent, {
      panelClass: ['common-bottom-sheet'],
      data: brand
    });
    this.loadAllBrands()
  }

  valueGetter(value: any) {
    this.brandActiveState = value;
    this.loadAllBrands();
  }

  ngOnInit(): void {

    this.searchForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => {
        this.searchText = data.searchText;
        this.loadAllBrands();
      });

  }


  public getServerData(event?: PageEvent): any {
    this.pageSize = event?.pageSize;
    this.page = event?.pageIndex;
    console.log(event);
    this.loadAllBrands();
  }

  private loadAllBrands() {
    this.brandService.getAllBrandsBySearchText(this.page, this.pageSize, this.searchText, this.brandActiveState).subscribe(response => {
      this.allBrandsArray = response.data.list;
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
