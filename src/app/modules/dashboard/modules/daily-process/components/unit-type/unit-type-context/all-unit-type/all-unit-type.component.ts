import { Component, OnInit } from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {ManageUnitTypeDataBottomSheetComponent} from "./inner-items/bottom-sheet/manage-unit-type-data-bottom-sheet/manage-unit-type-data-bottom-sheet.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonSnackBarService} from "../../../../../../../share/service/core/common-snack-bar-service.service";
import {debounceTime} from "rxjs";
import {UnitTypeService} from "../../../../../../../share/service/unit-type/unit-type.service";
import {ManageProductTypeDataBottomSheetComponent} from "../../../product-type/product-type-context/all-product-type/inner-items/bottom-sheet/manage-product-type-data-bottom-sheet/manage-product-type-data-bottom-sheet.component";


@Component({
  selector: 'app-all-unit-type',
  templateUrl: './all-unit-type.component.html',
  styleUrls: ['./all-unit-type.component.scss']
})
export class AllUnitTypeComponent implements OnInit {

  allUnitTypesArray: Array<any> = [];

  page: number | undefined = 0;
  pageSize: number | undefined = 10;
  pageSizeOptions = [5, 10, 20, 30, 50, 80, 100];
  dataCount = 0;
  pageEvent: PageEvent | undefined;

  activeState = 'active';
  searchText = '';
  unitTypeActiveState = 'all';

  availability: string[] = ['All', 'Active', 'Inactive'];

  searchForm = new FormGroup({
    searchText: new FormControl(''),
    activeState: new FormControl(null,
      [Validators.required]),
  });

  constructor(
    private unitTypeService: UnitTypeService,
    private _bottomSheet: MatBottomSheet,
    private commonSnackBarService: CommonSnackBarService
  ) {
  }
  valueGetter(value: any) {
    this.unitTypeActiveState = value;
    this.loadAllUnitTypes();
  }

  ngOnInit(): void {
    this.searchForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => {
        this.searchText = data.searchText;
        this.loadAllUnitTypes();
      });
  }

  openBottomSheet(unitType: any): void {
    this._bottomSheet.open(ManageUnitTypeDataBottomSheetComponent, {
      panelClass: ['common-bottom-sheet'],
      data: unitType
    });
  }

  public getServerData(event?: PageEvent): any {
    this.pageSize = event?.pageSize;
    this.page = event?.pageIndex;
    console.log(event);
    this.loadAllUnitTypes();
  }

  private loadAllUnitTypes() {
    this.unitTypeService.getAllUnitTypesBySearchText(this.page, this.pageSize, this.searchText, this.unitTypeActiveState). subscribe(response => {
      this.allUnitTypesArray = response.data.list;
      this.dataCount = response.data.dataCount;

      console.log(this.allUnitTypesArray)
      console.log(response)
      console.log(this.allUnitTypesArray[5]?.symbol)
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
