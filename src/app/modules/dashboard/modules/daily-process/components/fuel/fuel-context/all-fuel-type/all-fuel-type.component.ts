import {Component, OnInit} from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {FuelTypeBottomSheetComponent} from "./inner-items/bottom-sheet/fuel-type-bottom-sheet/fuel-type-bottom-sheet.component";
import {PageEvent} from "@angular/material/paginator";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonSnackBarService} from "../../../../../../../share/service/core/common-snack-bar-service.service";
import {debounceTime} from "rxjs";
import {FuelTypeService} from "../../../../../../../share/service/fuel-type/fuel-type.service";
import {ManageUnitTypeDataBottomSheetComponent} from "../../../unit-type/unit-type-context/all-unit-type/inner-items/bottom-sheet/manage-unit-type-data-bottom-sheet/manage-unit-type-data-bottom-sheet.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-all-fuel-type',
  templateUrl: './all-fuel-type.component.html',
  styleUrls: ['./all-fuel-type.component.scss']
})
export class AllFuelTypeComponent implements OnInit {

  allFuelTypesArray: Array<any> = [];
  page: number | undefined = 0;
  pageSize: number | undefined = 10;
  pageSizeOptions = [5, 10, 20, 30, 50, 80, 100];
  dataCount = 0;
  pageEvent: PageEvent | undefined;
  searchText = '';
  fuelTypeActiveState = 'All';
  availability: string[] = ['All', 'Available', 'Unavailable'];
  searchForm = new FormGroup({
    searchText: new FormControl(''),
    activeState: new FormControl(null,
      [Validators.required]),

  });

  constructor(
    private fuelTypeService: FuelTypeService,
    private _bottomSheet: MatBottomSheet,
    private commonSnackBarService: CommonSnackBarService,
    public dialog: MatDialog
  ) {
  }

  openBottomSheet(fuelType: any): void {
    this._bottomSheet.open(FuelTypeBottomSheetComponent, {
      panelClass: ['common-bottom-sheet'],
      data: fuelType
    });
  }

  valueGetter(value: any) {
    this.fuelTypeActiveState = value;
    console.log(value)
    console.log(this.fuelTypeActiveState)
    this.loadAllFuelTypes();
  }

  ngOnInit(): void {

    this.searchForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(data => {
        this.searchText = data.searchText;
        this.loadAllFuelTypes();
      });

  }

  public getServerData(event?: PageEvent): any {
    this.pageSize = event?.pageSize;
    this.page = event?.pageIndex;
    console.log(event);
    this.loadAllFuelTypes();
  }

  private loadAllFuelTypes() {
    this.fuelTypeService.getAllFuelTypesBySearchText(this.page, this.pageSize, this.searchText, this.fuelTypeActiveState).subscribe(response => {
      this.allFuelTypesArray = response.data.list;
      this.dataCount = response.data.dataCount;
      console.log(this.allFuelTypesArray)
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
