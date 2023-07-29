import {Component, OnInit} from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {ManageProductTypeDataBottomSheetComponent} from "./inner-items/bottom-sheet/manage-product-type-data-bottom-sheet/manage-product-type-data-bottom-sheet.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PageEvent} from "@angular/material/paginator";
import {debounceTime} from "rxjs";
import {ProductTypeService} from "../../../../../../../share/service/product-type/product-type.service";
import {CommonSnackBarService} from "../../../../../../../share/service/core/common-snack-bar-service.service";
import {ManageBrandBottomSheetComponent} from "../../../brand/brand-context/all-brand/inner-items/brand-bottom-sheet/manage-brand-bottom-sheet/manage-brand-bottom-sheet.component";

@Component({
  selector: 'app-all-product-type',
  templateUrl: './all-product-type.component.html',
  styleUrls: ['./all-product-type.component.scss']
})
export class AllProductTypeComponent implements OnInit {

  allProductTypesArray: Array<any> = [];

  page: number | undefined = 0;
  pageSize: number | undefined = 10;
  pageSizeOptions = [5, 10, 20, 30, 50, 80, 100];
  dataCount = 0;
  pageEvent: PageEvent | undefined;

  activeState = 'active';
  searchText = '';
  productTypeActiveState = 'all';

  availability: string[] = ['All', 'Available', 'Unavailable'];

  searchForm = new FormGroup({
    searchText: new FormControl(''),
    activeState: new FormControl(null,
      [Validators.required]),

  });

  constructor(
    private productTypeService: ProductTypeService,
    private _bottomSheet: MatBottomSheet,
    private commonSnackBarService: CommonSnackBarService
  ) {
  }

  valueGetter(value: any) {
    if (value === 'All') {
      this.productTypeActiveState = "all";
    } else if (value === 'Available') {
      this.productTypeActiveState = "available";
    } else {
      this.productTypeActiveState = "unavailable";
    }
    this.productTypeActiveState = value;
    this.loadAllProductTypes();
  }

  ngOnInit(): void {

    this.searchForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => {
        this.searchText = data.searchText;
        this.loadAllProductTypes();
      });
  }

  openBottomSheet(productType: any): void {
    this._bottomSheet.open(ManageProductTypeDataBottomSheetComponent, {
      panelClass: ['common-bottom-sheet'],
      data: productType
    });
  }


  public getServerData(event?: PageEvent): any {
    this.pageSize = event?.pageSize;
    this.page = event?.pageIndex;
    console.log(event);
    this.loadAllProductTypes();
  }


  private loadAllProductTypes() {
    this.productTypeService.getAllProductTypesBySearchText(this.page, this.pageSize, this.searchText, this.productTypeActiveState).subscribe(response => {
      this.allProductTypesArray = response.data.list;
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
